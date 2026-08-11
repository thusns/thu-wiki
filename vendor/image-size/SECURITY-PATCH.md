# Local security patch (image-size 2.0.3)

Upstream `image-size@2.0.2` is the latest npm release. The repository was archived
2026-06-03 with no further releases. This vendored copy applies fixes for:

- CVE-2025-71329 / GHSA-5p2g-fcmc-qvqq — infinite loop in JXL/HEIF parsers when a
  box reports size 0
- CVE-2025-71330 / GHSA-w3rx-r6r6-pgpr — related zero-length advance DoS (ICNS and
  remaining box callers)

## Changes

1. `readBox`: require an 8-byte header; map ISO BMFF size `0` to "extends to EOF"
   instead of a zero-length box that never advances offsets.
2. `findBox`: advance by `box.size` only (size is never 0 after readBox).
3. ICNS `calculate`: break when entry length is < 8 so a zero-length entry cannot
   hang the event loop.

Based on analysis: https://joshua.hu/image-size-infinite-loop-dos-vulnerabilities
