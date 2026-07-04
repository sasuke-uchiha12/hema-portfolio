When I first read *"An Image is Worth 16x16 Words,"* the idea felt almost too simple to work: take an image, chop it into little squares, pretend each square is a word, and hand the whole thing to a Transformer. No convolutions. No hand-crafted feature maps. Just attention.

So I decided to build one from scratch — no `timm`, no pretrained weights — and train it on CIFAR-10 to actually understand what every line does.

## Why patches?

A Transformer operates on a sequence of tokens. Text gives you that for free: words are already discrete units. Images don't — they're a dense grid of pixels, and feeding 32×32×3 = 3,072 individual pixels as tokens would be hopeless for attention, which scales quadratically with sequence length.

The trick is to **split the image into fixed-size patches** and treat each patch as a token. A 32×32 image with 4×4 patches becomes a neat sequence of 64 tokens — small enough for attention to handle, large enough to carry real structure.

## The patch embedding

The elegant part is that "cut into patches and project each one" is *exactly* what a strided convolution does. One `Conv2d` with `kernel_size = stride = patch_size` gives you patch embedding in a single, fast operation:

```python
class PatchEmbedding(nn.Module):
    def __init__(self, img_size=32, patch_size=4, in_channels=3, embed_dim=128):
        super().__init__()
        self.proj = nn.Conv2d(
            in_channels, embed_dim, patch_size, patch_size
        )
        self.cls_token = nn.Parameter(torch.zeros(1, 1, embed_dim))

    def forward(self, x):
        x = self.proj(x).flatten(2).transpose(1, 2)
        cls = self.cls_token.expand(x.shape[0], -1, -1)
        return torch.cat([cls, x], dim=1)
```

That `cls_token` is a learnable vector prepended to the sequence. After all the attention layers, its final state becomes the summary we classify from — a neat idea borrowed straight from BERT.

## Attention is the whole game

Once you have a sequence of patch embeddings, the rest is a standard Transformer encoder. The pieces I implemented, in order:

- **Positional embeddings** — attention is permutation-invariant, so without these the model has no idea *where* each patch came from.
- **Multi-head self-attention** — every patch gets to look at every other patch and decide what's relevant.
- **MLP blocks with residual connections** — the per-token processing between attention layers.
- **A classification head** — a single linear layer on the final `cls_token`.

> The thing that surprised me most: a from-scratch ViT *underperforms* a small CNN on CIFAR-10 unless you add heavy augmentation. Transformers have almost no built-in inductive bias about images, so they need far more data — or clever tricks — to catch up.

## What I actually learned

Building it by hand made two things click that no diagram ever did. First, **the CNN and the Transformer aren't opposites** — the patch embedding *is* a convolution, so a ViT is really "one conv layer, then pure attention." Second, **inductive bias is a real, tangible tradeoff**: CNNs bake in locality and translation-invariance for free, and when you throw that away, the data has to teach it back.

If you're learning this stuff, I'd genuinely recommend skipping the library wrapper once and typing out every layer. The paper stops being abstract the moment your own `forward()` runs.
