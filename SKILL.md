---
name: four-panel-reference-generator
description: "Generate one 2x2 person reference sheet with four consistent character views and equal portrait 9:16 cells. Use an available image generation tool for character reference images or image/video character assets, not narrative storyboards or object multi-view sheets."
---

# 人物四格参考图生成器

将同一个人物重新构图为**一张包含四个等大格子的参考图**，默认上排半身、下排全身。用图像生成工具制作成图，检查布局和人物内容，必要时对成图进行一次定向修正。这里的“四分镜”指角色视角参考，不编排故事情节。

## 输入与人物一致性

- 用户提供参考图且未要求纯文字生成时，先查看每张图，并将它们作为视觉参考传入图像生成工具。**人物坐姿、歪头、动态动作或复杂背景都不是丢弃参考图的理由。** 用提示词说明只保留人物身份、体型、发型、服装和配饰，重新安排姿态、机位与背景。
- 多张图属于同一个人物时，优先用清晰面部图确定身份，用完整服装图补充穿着。人物身份或服装版本明显冲突、且用户未指定选择时，先问清楚，不能混合成新人物。
- 只有没有人物参考图、或用户明确要求纯文字生成时，才使用文字路线。按用户描述建立一个固定人物，四格复用同一套外观。
- 看不到的服装背面、下装或鞋子可以保守补全，四格保持一致；不要把补全细节宣称为原图事实。
- 默认延续参考人物的照片、插画或 3D 表现方式；纯文字输入默认摄影效果。用户指定的风格和换装优先。
- 本地图片先查看再使用。按实际工具接口附带参考图；若接口提供 `referenced_image_paths` 和 `num_last_images_to_include`，只选一种，且包含所有需要的参考图。不能在提示词里写“保持参考人物”却没有实际附图。必要参考图不可访问时，请用户重新附上。

## 最终规格

先合并用户要求和默认值，得到**一份最终规格**。用户指定的视角、位置、方向、裁切、比例、分隔线、风格、背景和标签覆盖对应默认值；提示词与验收都使用最终规格，不能同时保留互相冲突的要求。

标准目标是**整图和四个分镜都为竖版 9:16**。把白色十字线放在整图宽、高各 50% 的位置，使四格等宽、等高；各格都完整容纳规定的半身或全身视图。默认优先争取当前工具支持的**最高原生分辨率和最高生成质量**，不默认限制为 1080×1920。用户明确指定尺寸时按用户要求生成。

工具提供尺寸、质量或原生高清选项时，按真实接口选择支持目标比例的最高档；没有这些选项时，在提示词中要求最高原生画质，不虚构参数或承诺工具无法控制的分辨率。不要为了增大文件尺寸反复插值放大，也不要把放大后的尺寸当作新增真实细节。

使用**细白色十字分隔线**，居中叠加在格子边界，不额外插入白色间距，不加外框或额外留白。每格人物放在本格内部，不跨越分隔线。

| 位置 | 默认标签 | 默认视角与裁切 |
| --- | --- | --- |
| 左上 | `FACE FRONT` | 正面半身，从完整头顶到肚脐附近；肩膀和可见上臂完整。 |
| 右上 | `FACE SIDE` | 45° 前侧半身，与左上裁切、尺度一致；人物朝成图左侧，鼻尖指向本格左边的中央分隔线，后脑朝右；头和躯干同向，双眼可见。 |
| 左下 | `BODY FRONT` | 正面全身，完整头顶至鞋底；自然直立，视线朝相机。 |
| 右下 | `BODY BACK` | 正背面全身，完整头顶至鞋底；头和躯干直接背向相机，不回头，不露出脸。 |

`FACE SIDE` 默认是 45° 前侧视角；用户要求 90° 真侧面时，改用侧面轮廓和单眼可见，不再要求双眼可见。

- **裁切分开约束：** 上排保留头顶、肩膀和可见上臂，允许腰以下、手和鞋在画面外；下排必须完整保留头、双臂、手、双腿和鞋。不要为了让上排露出鞋而把半身图缩成全身图。
- 两张半身图的人物尺度一致；两张全身图的人物尺度、脚底基线一致。四格指向同一个人物，不要求半身与全身采用同一缩放尺度。
- 默认中性直立：头正、肩平、重心自然，双臂下垂，手放松在大腿两侧，双脚约髋宽。避免歪头、交叉腿、扭腰和回眸。不要用“A-Pose”替代自然下垂的手臂。
- 默认背景为统一的中性灰影棚、柔和均匀光线和自然落地阴影。参考图的场景与姿势不迁移；用户指定的背景、姿势或光照优先。
- 默认在每格左上角放对应的小号大写无衬线标签，不遮挡人物。用户要求无字时取消全部标签。

## 生成提示词

使用当前环境可用的图像生成工具，默认一次调用生成含四个视图的完整成图，保持四格人物和服装一致。要求工具同时绘制清晰的细白色十字线和四个准确的英文标签，不添加其他文字。

把人物、服装、四个视角、裁切、姿态和等格布局写进实际工具提示词。可以使用以下结构，填入最终选择；不要把占位符直接发送给工具：

```text
Create ONE finished 2x2 character reference sheet, with the same person in four views.
Canvas: {final sheet aspect ratio}; four cells of EXACTLY equal pixel width and height, each with {final cell aspect ratio}.
Grid: put the vertical divider at EXACTLY 50% of the canvas width and the horizontal divider at EXACTLY 50% of the canvas height. Top and bottom rows must have identical heights.
Resolution and quality: use the highest native resolution and best image quality available in this tool; preserve fine facial features, hair strands, fabric textures and outfit details in all four cells.
Dividers: thin WHITE vertical and horizontal lines on those exact centers; no gutters or outer frame.
Labels: {place the final labels in the upper-left corner of their respective cells, or omit all labels if requested}; no other text.
Subject: {identity, hair, body proportions, clothing and accessories}.
References: {the role of each attached image, if any}.
Preserve the same identity, hairstyle, outfit and asymmetric details in all four cells.
Recompose the subject according to the final views, pose and backdrop.

TOP LEFT: {final view, crop and direction}.
TOP RIGHT: {final view, crop and direction}.
BOTTOM LEFT: {final view, crop and direction}.
BOTTOM RIGHT: {final view, crop and direction}.

Pose: {final pose}.
Style and background: {final medium, backdrop and lighting}.
Framing: {separate portrait and full-body requirements; matching scale within each pair}.
Leave a little background margin around each subject. Do not crop the required body parts or let the subject cross a divider.
```

默认右上视角的描述使用成图坐标：`45-degree front three-quarter view facing image LEFT, nose toward the center divider at this cell's LEFT edge, back of the head toward the RIGHT edge; head and torso face the same way, both eyes visible.` 不用容易混淆的“人物左侧”或“相机向右”。

纯文字路线删去参考图语句。有参考图的路线必须附图。用户自定义规格时替换相应描述，并删除失效的默认方向、裁切、比例、姿态、背景和标签要求。

## 等格检查与修正

生成后查看完整图片，检查水平白线是否穿过**整图高度的一半**，上下两排是否等高；检查竖线是否居中、四格是否等大，以及人物、视角和标签是否正确。工具提供实际像素尺寸时，核对整图与各格的 9:16 比例；若只有视觉预览，只能报告目视检查结果，不能宣称像素级精确。

若分隔线偏移、上下格不等高或整体比例错误，使用当前图像生成工具对**刚生成的成图**做一次定向编辑：要求保持同一人物、四格顺序、服装和标签，仅重排为宽高各 50% 分割的等格 9:16 成图。编辑后再次检查全部要求。不要把四格分别生成为四个人，也不要镜像错误朝向的格子，以免反转发缝、图案或配饰。

## 检查与交付

查看排版后的成品，按最终规格检查：

1. 一张图、四个等大格子，人物不跨格；标准版整图和每格均为竖版 9:16，细白色十字线居中。用户明确改动规格时按其要求检查。
2. 四格人物身份、发型、服装颜色、配饰及非对称细节一致。
3. 四格视角正确；默认右上朝成图左侧，右下为直接背面。
4. 半身与全身分别满足裁切要求，配对尺度一致，全身图不缺手脚。
5. 姿态、背景、风格和标签符合最终规格。
6. 生成工具有可控选项时已选择最高原生分辨率和质量，没有时已在实际提示词中要求最高原生画质；如能获知实际像素尺寸，按实报告。

默认一次生成；只有发现布局错误时，才最多追加一次针对成图的编辑。编辑仍不能满足规格，或出现人物身份、服装、视角等内容问题时，如实指出未达标之处，不把不合格成图称为合格参考图。生成工具拦截时报告具体问题；不要无限重试。

展示生成图，并简短报告实际可知的像素尺寸和可见问题；工具没有可控高清选项时，不把提示词请求宣称为已经保证最高原生分辨率。
