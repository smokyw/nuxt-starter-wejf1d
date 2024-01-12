<script setup lang="ts">
const props = defineProps<{
  /** Выбранные сотрудники */
  selectedEmployees: Set<string>
  /** Достать ли сотрудников из архива */
  unarchive: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()

/** Функция для архивации сотрудников. */
async function archiveEmployees() {
  if (props.unarchive) {
    // Отправляем запрос на восстановление
    await useApi().admin.adminPanelRestoreUsers(
      {
        ids: Array.from(toRefs(props).selectedEmployees.value),
      },
      {
        headers: useAuth().generateHeaders(),
      }
    )
  } else {
    // Отправляем запрос на архивацию
    await useApi().admin.adminPanelArchiveUsers(
      {
        ids: Array.from(toRefs(props).selectedEmployees.value),
      },
      {
        headers: useAuth().generateHeaders(),
      }
    )
  }

  // Закрываем окно
  emit("close")
}
</script>

<template>
  <VPopup
    is-small
    :title="
      t(
        `admin.employees.actions.${unarchive ? 'unarchive' : 'archive'}.title`,
        {
          number: selectedEmployees.size,
        }
      )
    "
    window-classes="!w-[30.5rem]"
    @click-outside="emit('close')"
  >
    <p v-if="!unarchive">
      {{ t("admin.employees.actions.archive.description") }}
    </p>
    <template #footerButtons>
      <button
        class="button sm primary"
        data-test-id="archiveEmployees"
        @click="archiveEmployees"
      >
        {{
          t(
            unarchive
              ? "admin.employees.actions.unarchive.button"
              : "system.archive"
          )
        }}
      </button>
      <button
        class="button sm outlined"
        data-test-id="emit"
        @click="emit('close')"
      >
        {{ t("system.cancel") }}
      </button>
    </template>
  </VPopup>
</template>
