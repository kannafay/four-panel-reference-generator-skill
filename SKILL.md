---
name: four-panel-reference-skill
description: "Create a 2x2 reference sheet of one person for character design and image or video assets. Use for character views, not narrative storyboards or object turnarounds."
---

# Four-Panel Character Reference

Use an image generation tool to present the same person in one 2x2 reference sheet. Explicit user requests override the defaults below.

## References

- Inspect and attach provided references, preserving identity, body type, hair, outfit, accessories, and asymmetric details. Recompose pose and background; do not switch to text-only generation because a reference is complex.
- Use compatible references together; clarify conflicting identities or outfits and request inaccessible essential references. Infer unseen details conservatively and consistently, without claiming they were visible in the source.
- Preserve the reference style. With no reference or an explicit text-only request, follow the description and default to photographic rendering.

## Layout

- Both the sheet and each cell are portrait **9:16**. Divide at **50%** width and height with thin white lines. Use four equal cells, no gutters, outer frame, extra margins, or figures crossing cells.

| Position | Default label | View and framing |
| --- | --- | --- |
| Top left | FACE FRONT | Front, full head to around the navel, shoulders and upper arms visible. |
| Top right | FACE SIDE | 45-degree front three-quarter view: nose toward the center divider (image left), back of head toward image right, subject's left cheek more visible. Head and torso align; both eyes visible. |
| Bottom left | BODY FRONT | Front, looking at the camera; entire head, arms, hands, legs, and shoes visible. |
| Bottom right | BODY BACK | Head and torso directly away from the camera, no face or head turn; entire head, arms, hands, legs, and shoes visible. |

- Match crop and scale in the top two panels; hands and areas below the waist may fall outside their crop. Match scale and foot baseline in the bottom two panels.
- Stand naturally upright: head straight, shoulders level, arms down, hands beside thighs, feet hip-width apart. Use the same neutral gray studio, soft light, and natural ground shadows.
- Place small uppercase English sans-serif labels in each panel's upper-left corner without covering the figure. No other text; omit labels if requested.
- A requested true 90-degree profile replaces the top-right view; show one eye instead of two.

## Generation and Delivery

- Make at most one image-generation or image-edit call per user request, requesting exactly one finished image containing all four panels. For an explicit follow-up revision, edit the existing sheet in that request's single call when editing is supported. Do not generate panels separately or mirror the character to fix direction.
- Write an English prompt covering the character, reference roles, and final specifications. Use the highest supported native quality and resolution. Request unavailable controls in the prompt without promising exact dimensions or extra detail from upscaling.
- Inspect layout, identity, outfit, views, framing, pose, style, and labels. Check the ratio from pixel dimensions when available; otherwise report only visual findings. Inspection is read-only: report defects and wait for an explicit user request before any further generation or edit, including layout, label, or resolution fixes.
- Show the returned image using the existing tool result or image asset, with known dimensions and remaining issues. Do not call generation again to deliver the image or provide alternatives. If generation fails or is blocked, stop and explain without an automatic retry.
