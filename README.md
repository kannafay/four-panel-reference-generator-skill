# Four Panel Reference Generator

一个生成同一人物四视角参考图的 Agent Skill。详细生成要求见 [SKILL.md](SKILL.md)。

| 左上 | 右上 |
| --- | --- |
| `FACE FRONT`：正面半身 | `FACE SIDE`：45° 前侧半身 |
| `BODY FRONT`：正面全身 | `BODY BACK`：正背面全身 |

默认灰色影棚、英文标签、白色十字分割线；目标是整图与每格均为竖版 9:16。纯技能通过生成与检查控制布局，图像工具仍可能输出不等高的格子，具体结果以成图检查为准。

## 安装与使用

下载仓库，把包含 `SKILL.md` 的整个目录放入 `~/.agents/skills/four-panel-reference-generator/`（Windows：`%USERPROFILE%\.agents\skills\four-panel-reference-generator\`）。重新打开 Codex 后，附上人物参考图并输入 `$four-panel-reference-generator`。安装位置见 [OpenAI Docs](https://learn.chatgpt.com/docs/build-skills)。

## 许可

[MIT](LICENSE)。
