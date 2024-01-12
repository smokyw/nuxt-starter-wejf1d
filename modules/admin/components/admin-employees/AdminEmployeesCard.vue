<script setup lang="ts">
import type { AdminPanelUsersGetCollectionSuccessResponse } from "~/Api"

defineProps<{
  /** Сотрудник */
  employee: NonNullable<
    NonNullable<AdminPanelUsersGetCollectionSuccessResponse["data"]>["success"]
  >[number]
}>()

const { t } = useI18n()

/** Выбранные сотрудники */
const selectedEmployees = inject<Ref<Set<string>>>("selectedEmployees")
</script>

<template>
  <div
    class="group grid h-[3.25rem] grid-cols-[3.25rem_6rem_17rem_8.5rem_8.5rem_7.25rem_9.5rem] items-center hover:bg-neutral-50"
    :class="{ 'bg-neutral-50': selectedEmployees?.has(employee.id!) }"
  >
    <div class="flex items-center justify-center">
      <input
        v-model="selectedEmployees"
        data-test-id="selectedEmployees"
        type="checkbox"
        :value="employee.id"
      />
    </div>
    <p class="mx-4 line-clamp-1 grow">
      {{ employee.id }}
    </p>
    <NuxtLinkLocale
      class="flex flex-col gap-y-0.5 px-4 font-regular text-neutral-900"
      :to="`/admin/employees/${employee.id}`"
    >
      <p class="line-clamp-1">
        {{ useUserDisplay(employee.employee!).getFullName() }}
      </p>
      <div class="flex items-center gap-x-1.5">
        <span
          class="flex h-5 items-center justify-center rounded border border-neutral-200 px-1 text-xs text-neutral"
        >
          {{ employee.employee?.id }}
        </span>
        <p class="line-clamp-1 text-xs text-neutral">
          {{ employee.employee?.position?.name }}
        </p>
      </div>
    </NuxtLinkLocale>
    <p class="px-4">{{ employee.role?.name }}</p>
    <p class="px-4">
      {{ t(`admin.employees.filters.sources.values.${employee.source}`) }}
    </p>
    <p class="px-4">
      {{
        useDateConverter().parseDate(employee.created_at!).toLocaleDateString()
      }}
    </p>
    <NuxtLinkLocale
      class="button hidden group-hover:flex"
      target="_blank"
      :to="`/employees/${employee.employee?.id}`"
    >
      <Icon name="SvgoArrowCircleBrokenUp" size="16" />
      <span class="font-regular">{{ t("admin.employees.ipr") }}</span>
    </NuxtLinkLocale>
  </div>
</template>
