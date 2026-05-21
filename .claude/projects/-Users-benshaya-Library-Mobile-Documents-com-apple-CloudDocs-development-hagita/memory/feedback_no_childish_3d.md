---
name: No childish 3D primitives
description: User hates procedural 3D geometry (spheres, boxes) for food - demands photorealistic quality
type: feedback
---

Never use procedural Three.js geometry (SphereGeometry, BoxGeometry, etc.) to represent real-world food items. It always looks childish and amateurish.

**Why:** User has complained about this 3+ times across sessions. Deformed spheres for tomatoes/lemons, simple geometry for rice balls — these will never look realistic in Three.js.

**How to apply:** Only use high-quality GLB/GLTF models for food items. If no good model is available, use image-based approaches (parallax photos, CSS effects) rather than primitive 3D geometry. For abstract 3D (particles, waves, gradients), procedural geometry is fine — it's specifically food that must look real.
