# 人物四格参考图

生成同一人物四视角参考图的通用技能，具体规则见[技能说明](SKILL.md)。使用时需要图像生成能力，有参考图时还需支持图像输入。

## 安装与使用

`SKILL.md` 位于仓库根目录。将 `four-panel-reference-generator-skill/` 按所用工具的方式导入或放入技能目录。

附上参考图或描述人物，要求使用“人物四格参考图”技能。具体安装位置和调用方式以所用工具为准，文件格式见[通用技能规范](https://agentskills.io/specification)。

## 维护与打包

在仓库目录运行：

```text
pnpm install --frozen-lockfile
pnpm test
pnpm build
```

压缩包输出到 `dist/four-panel-reference-generator-skill-<版本号>.zip`，版本号取自 `package.json`。解压后的目录为 `four-panel-reference-generator-skill/`，其中仅含 `SKILL.md` 和 `LICENSE`。

## 许可

[MIT 许可证](LICENSE)，保留许可原文。
