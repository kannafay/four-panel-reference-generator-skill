---
name: four-panel-reference-skill
description: "Create a 2x2 reference sheet of one person for character design and image or video assets. Use for character views, not narrative storyboards or object turnarounds."
---

# Four-Panel Character Reference

Use an image generation tool to present the same person in one 2x2 reference sheet. Explicit user requests override the defaults below.

## Character and Reference Images

- When reference images are available, inspect and attach them to the generation call. Preserve identity, body type, hair, clothing, accessories, and asymmetric details while rearranging the pose and background. Do not switch to text-only generation because the original pose or background is complex. With no reference image, or when explicitly asked to use text only, establish the appearance from the description.
- Use multiple references as complementary sources. If identity or outfit versions conflict and the user has not chosen one, clarify which to use. Ask the user to reattach any necessary reference that cannot be accessed.
- Conservatively complete unseen back details, lower-body clothing, or shoes. Keep these additions consistent across all four panels without presenting them as facts visible in the source. Preserve the reference style by default; use a photographic style for text-only input.

## Default Output

- Both the complete sheet and each panel have a portrait **9:16** ratio. Overlay thin white divider lines at **50%** of the sheet's width and height. All four panels have equal dimensions, with no gutters, outer frame, or extra margins. Keep the figure within each panel.
- Use the highest native resolution and quality the tool actually supports. If corresponding controls are unavailable, express the requirements in the prompt. Do not promise dimensions you cannot control or describe interpolated upscaling as added detail.

| Position | Default label | View and framing |
| --- | --- | --- |
| Top left | FACE FRONT | Front view, from the full crown of the head to around the navel, including shoulders and visible upper arms. |
| Top right | FACE SIDE | 45-degree front three-quarter view, matching the top-left crop and scale. The nose points toward the central divider on image left, with the back of the head toward image right. The subject's own left cheek is more visible; head and torso face the same direction, with both eyes visible. |
| Bottom left | BODY FRONT | Standing upright, facing and looking at the camera. Include the entire head, both arms, hands, legs, and shoes. |
| Bottom right | BODY BACK | Head and torso face directly away from the camera. No head turn or visible face. Include the entire head, both arms, hands, legs, and shoes. |

- If the user specifies a true 90-degree profile, use a single-eye profile in the top-right panel and remove the requirement for both eyes to be visible.
- Half-body views may crop the hands and areas below the waist; full-body views must include complete hands and feet. Match scale between the two half-body views, and match scale and foot baseline between the two full-body views.
- Keep the head upright, shoulders level, and posture naturally straight, with arms relaxed, hands beside the thighs, and feet roughly hip-width apart. Use a consistent neutral gray studio background, soft light, and natural ground shadows.
- Place the corresponding small uppercase English sans-serif label in each panel's upper-left corner without covering the figure. Add no other text. Omit labels when the user requests no text.

## Generation and Delivery

1. Write an English generation prompt covering the character, the role of each reference, and the final output specifications. Generate the complete four-panel sheet in one call. Remove conflicting defaults when the user changes a specification.
2. Inspect the result against the final specifications: layout, identity and clothing consistency, views, framing, pose, style, and labels. Verify the ratio from pixel dimensions when available; with only a preview, report only visual inspection findings.
3. If the layout is wrong and editing is supported, make at most one targeted edit to the current sheet. Preserve the character, clothing, and all four panels' content while correcting only the layout, then inspect again. Do not split the task into four independent generations or mirror the person to correct orientation.
4. Show the image and briefly report known dimensions and visible issues. Disclose identity, clothing, or view mismatches and any remaining problems after correction. If generation is blocked, stop and explain rather than repeatedly retrying.
