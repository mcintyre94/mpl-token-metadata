import { rootNodeFromAnchor } from "@codama/nodes-from-anchor";
import { renderJavaScriptVisitor } from "@codama/renderers";
import { createFromRoot } from "codama";

import anchorIdl from "./idl.json" with { type: "json" };
import { writeFileSync } from "fs";

const codama = createFromRoot(rootNodeFromAnchor(anchorIdl));

codama.accept(
  renderJavaScriptVisitor("./client-js/src/generated/", {
    deleteFolderBeforeRendering: true,
    formatCode: true,
  })
);
