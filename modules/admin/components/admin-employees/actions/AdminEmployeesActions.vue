<script setup lang="ts">
defineProps<{
  /** Выбранные сотрудники */
  selectedEmployees: Set<string>
  /** Достать ли сотрудников из архива */
  unarchive: boolean
}>()

const emit = defineEmits<{
  archive: []
  generateReport: []
}>()

const { t } = useI18n()
</script>

<template>
  <div
    class="flex items-center divide-x divide-neutral-200 *:px-4 *:text-sm *:text-primary"
  >
    <span>{{ t("system.selected", { number: selectedEmployees.size }) }}</span>
    <HeadlessMenu as="div" class="relative">
      <HeadlessMenuButton class="group hover:text-primary-600">
        <span>{{ t("system.actions") }}</span>
        <Icon
          class="fill-primary group-hover:fill-primary-600"
          name="SvgoChevronDown"
          size="16"
        />
      </HeadlessMenuButton>
      <HeadlessMenuItems
        class="absolute top-full mt-2 flex flex-col divide-y divide-neutral-200 overflow-hidden rounded-md border border-neutral-200 bg-white *:w-60 *:px-3 *:py-2.5 *:text-left *:text-neutral-900 hover:*:bg-neutral-50"
      >
        <LazyHeadlessMenuItem
          v-if="!unarchive"
          as="button"
          data-test-id="emit"
          @click="emit('generateReport')"
        >
          {{ t("employees.page.statusButtons.generateReport") }}
        </LazyHeadlessMenuItem>
        <HeadlessMenuItem
          as="button"
          data-test-id="emit"
          @click="emit('archive')"
        >
          {{
            t(
              `admin.employees.actions.${
                unarchive ? "unarchive" : "archive"
              }.buttonTitle`
            )
          }}
        </HeadlessMenuItem>
      </HeadlessMenuItems>
    </HeadlessMenu>
  </div>
</template>
