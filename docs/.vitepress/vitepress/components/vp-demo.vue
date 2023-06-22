<script setup lang="ts">
import { computed, getCurrentInstance, toRef } from "vue";
import { isClient, useClipboard, useToggle } from "@vueuse/core";
import { useSourceCode } from "../composables/source-code";
import { usePlayground } from "../composables/use-playground";

import Example from "./demo/vp-example.vue";
import SourceCode from "./demo/vp-source-code.vue";

import {
  GithubOutlined,
  CopyOutlined,
  ExpandOutlined,
  ExperimentOutlined,
  CaretUpOutlined
} from "@ant-design/icons-vue";

const props = defineProps<{
  demos: object
  source: string
  path: string
  rawSource: string
  description?: string
}>();

const vm = getCurrentInstance()!;

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false
});

const [sourceVisible, toggleSourceVisible] = useToggle();
const demoSourceUrl = useSourceCode(toRef(props, "path"));

const formatPathDemos = computed(() => {
  const demos = {};

  Object.keys(props.demos).forEach((key) => {
    demos[key.replace("../../examples/", "").replace(".vue", "")] =
      props.demos[key].default;
  });

  return demos;
});

const decodedDescription = computed(() =>
  decodeURIComponent(props.description!)
);

const onPlaygroundClick = () => {
  const { link } = usePlayground(props.rawSource);
  if (!isClient) return;
  window.open(link);
};

const copyCode = async () => {
  const { $message } = vm.appContext.config.globalProperties;
  if (!isSupported) {
    $message.error("复制错误");
  }
  try {
    await copy();
    $message.success("复制成功");
  } catch (e: any) {
    $message.error(e.message);
  }
};

const gotoGithub = () => {
  window.open(demoSourceUrl.value + ".vue");
};

</script>

<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p text="sm" v-html="decodedDescription" />

    <div class="example">
      <Example :file="path" :demo="formatPathDemos[path]" />

      <el-divider class="m-0" style="border-color: var(--z-border-color)" />

      <div class="op-btns">
        <!--        <ATooltip placement="bottom">-->
        <!--          <template #title>在编辑器中编辑</template>-->
        <!--          <ExperimentOutlined style="font-size:16px" class="op-btn" @click="onPlaygroundClick">-->
        <!--          </ExperimentOutlined>-->
        <!--        </ATooltip>-->
        <el-tooltip placement="bottom" content="在github中编辑">
          <GithubOutlined
            style="font-size:16px"
            class="op-btn github"
            @click="gotoGithub"
          >
          </GithubOutlined>
        </el-tooltip>
        <el-tooltip placement="bottom" content="复制代码">
          <CopyOutlined style="font-size:16px" class="op-btn" @click="copyCode">
          </CopyOutlined>
        </el-tooltip>
        <el-tooltip placement="bottom" content="查看源代码">
          <ExpandOutlined style="font-size:16px" class="op-btn" @click="toggleSourceVisible()">
          </ExpandOutlined>
        </el-tooltip>
      </div>

      <ElCollapseTransition>
        <SourceCode v-show="sourceVisible" :source="source" />
      </ElCollapseTransition>

      <Transition name="el-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="example-float-control"
          tabindex="0"
          role="button"
          @click="toggleSourceVisible(false)"
        >
          <CaretUpOutlined style="font-size:16px">
          </CaretUpOutlined>
          <span>隐藏源代码</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
.m-0 {
  margin: 0;
}

.example {
  border: 1px solid var(--border-color);
  border-radius: var(--el-border-radius-base);

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;
    background-color: var(--bg-color);

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--vp-c-brand);
    }
  }
}
</style>