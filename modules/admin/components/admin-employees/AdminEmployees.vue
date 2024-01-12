<script setup lang="ts">
import type {
  AdminPanelUsersCollectionFilter,
  AdminPanelUsersCollectionSort,
  AdminPanelUsersGetCollectionSuccessResponse,
} from "~/Api"
import type { PaginationModel } from "~/components/v-pagination/VPagination.vue"

const props = defineProps<{
  /** Выбранные даты */
  dates: {
    /** Дата ОТ */
    from: Date | undefined
    /** Дата ДО */
    to: Date | undefined
  }
  /** Подразделения */
  divisions: number[]
  /** Выбранные роли */
  roles: Set<number>
  /** Статусы сотрудников */
  showArchive: boolean
  /** Выбранные интеграции */
  sources: Set<string>
}>()

const { t } = useI18n()

/** Сортировка */
const sort = ref<AdminPanelUsersCollectionSort>({
  attribute: "created_at",
  direction: "desc",
})

/**
 * Функция для выбора сортировки.
 *
 * Если текущий атрибут уже выбран, меняет направление сортировки.
 * Иначе выставляет новый атрибут.
 *
 * @param attribute - атрибут, по которому проводится сортировка.
 */
function selectSort(attribute: AdminPanelUsersCollectionSort["attribute"]) {
  // Если текущий атрибут уже выбран
  if (sort.value.attribute === attribute) {
    // Меняем направление сортировки
    sort.value.direction = sort.value.direction === "asc" ? "desc" : "asc"
  } else {
    // Иначе выставляем новый атрибут
    sort.value = {
      attribute,
      direction: "asc",
    }
  }
}

/** Пагинация */
const pagination = ref<PaginationModel>({
  currentPage: 1,
  pageSize: 50,
})

/** Список колонок таблицы */
const searchableColumns = {
  employee: "employee_text_query",
  id: "id",
} as const satisfies Partial<
  Record<
    keyof NonNullable<
      NonNullable<
        AdminPanelUsersGetCollectionSuccessResponse["data"]
      >["success"]
    >[number],
    keyof AdminPanelUsersCollectionFilter
  >
>

/** Поисковые запросы */
const searchQueries = ref<
  Partial<Record<keyof AdminPanelUsersCollectionFilter, string | undefined>>
>({
  employee_text_query: undefined,
  id: undefined,
})

const employees = ref(await getEmployees())

/**
 * Функция для получения списка сотрудников.
 *
 * @returns список сотрудников.
 */
async function getEmployees() {
  return await useApi().admin.adminPanelGetUsers(
    {
      filter: {
        archive: props.showArchive,
        created_after: props.dates.from
          ? useDateConverter().formatDate(props.dates.from)
          : undefined,
        created_before: props.dates.to
          ? useDateConverter().formatDate(props.dates.to)
          : undefined,
        division_ids: props.divisions,
        employee_text_query:
          searchQueries.value.employee_text_query ?? undefined,
        id: searchQueries.value.id ?? undefined,
        role_ids: Array.from(props.roles),
        sources: Array.from(props.sources),
      },
      pagination: {
        page: pagination.value.currentPage,
        per_page: pagination.value.pageSize,
      },
      sort: sort.value,
    },
    {
      headers: useAuth().generateHeaders(),
    }
  )
}

/**
 * Функция для обновления списка сотрудников.
 */
async function updateEmployees() {
  // Показываем спиннер загрузки
  isLoading.value = true

  // Получаем список сотрудников
  employees.value = await getEmployees()

  // Скрываем спиннер загрузки
  isLoading.value = false
}

watch(
  [props, pagination, sort, () => useRoute().path, searchQueries],
  () => {
    if (useRoute().path === "/admin") {
      updateEmployees()
    }
  },
  {
    deep: true,
  }
)

/** Показывать ли спиннер загрузки */
const isLoading = ref(false)

/** Список колонок таблицы */
const columns = [
  "id",
  "employee",
  "role",
  "source",
  "created_at",
] as const satisfies Array<
  keyof NonNullable<
    NonNullable<AdminPanelUsersGetCollectionSuccessResponse["data"]>["success"]
  >[number]
>

/** Список колонок таблицы */
const sortableColumns = [
  "id",
  "created_at",
] as const satisfies AdminPanelUsersCollectionSort["attribute"][]

/** Выбранные сотрудники */
const selectedEmployees = ref(new Set<string>())
provide("selectedEmployees", selectedEmployees)

/**
 * Функция для выбора всех сотрудников.
 *
 * Если все сотрудники из списка выбраны, очищаем выбранных сотрудников.
 * Иначе добавляем всех сотрудников в список.
 */
function selectAll() {
  // Если все сотрудники выбраны
  if (isAllSelected.value) {
    // Очищаем выбранных сотрудников
    employees.value.data.data?.success?.forEach((employee) =>
      selectedEmployees.value.delete(employee.id!)
    )
  } else {
    // Иначе добавляем всех сотрудников в список
    employees.value.data.data?.success?.forEach((employee) =>
      selectedEmployees.value.add(employee.id!)
    )
  }
}

/** Выбраны ли все сотрудники */
const isAllSelected = computed(() => {
  return (
    !!employees.value.data.data?.success?.length &&
    employees.value.data.data?.success?.every((employee) =>
      selectedEmployees.value.has(employee.id!)
    )
  )
})

/** Выбран ли хотя бы один сотрудник */
const isSomeSelected = computed(() => {
  return employees.value.data.data?.success?.some((employee) =>
    selectedEmployees.value.has(employee.id!)
  )
})

/** Открыто ли меню создания отчетов */
const isGenerateReportsVisible = ref(false)

/** Числовые ID сотрудников */
const employeesIds = ref<number[]>([])

/**
 * Функция для получения списка ID сотрудников.
 */
function getEmployeesIds() {
  selectedEmployees.value.forEach((selectedEmployee) => {
    employeesIds.value.push(
      employees.value.data.data?.success?.find(
        (employee) => employee.id === selectedEmployee
      )?.employee?.id ?? 0
    )
  })

  isGenerateReportsVisible.value = true
}

/** Видно ли окно перемещения сотрудников в архив */
const isArchiveVisible = ref(false)
</script>

<template>
  <div class="grid w-full grid-rows-[1fr_auto] gap-y-4">
    <div
      class="relative w-full overflow-auto rounded-lg border border-neutral-200 bg-white"
    >
      <div
        class="sticky left-0 top-0 z-20 flex h-[3.25rem] items-center justify-between bg-white p-4"
      >
        <div class="flex items-center">
          <p class="text-sm text-neutral">
            {{
              t(
                "admin.employees.accounts",
                employees.data.meta?.pagination?.total ?? 0
              )
            }}
          </p>
          <LazyAdminEmployeesActions
            v-if="selectedEmployees.size"
            :selected-employees="selectedEmployees"
            :unarchive="showArchive"
            @archive="isArchiveVisible = true"
            @generate-report="getEmployeesIds"
          />
        </div>
        <div v-if="!showArchive" class="flex items-center">
          <LazyNuxtLinkLocale
            class="button text-primary"
            to="/admin/employees/new"
          >
            <LazyIcon name="SvgoPlusCircle" />
            <span>{{ t("system.add") }}</span>
          </LazyNuxtLinkLocale>
        </div>
      </div>
      <div
        class="sticky top-[3.25rem] z-10 grid grid-cols-[3.25rem_6rem_17rem_8.5rem_8.5rem_7.25rem_9.5rem] bg-white"
      >
        <div
          class="flex items-center justify-center border-b border-neutral-200 bg-white"
        >
          <input
            :checked="isAllSelected"
            data-test-id="selectAll"
            :indeterminate="isSomeSelected && !isAllSelected"
            type="checkbox"
            @input="selectAll"
          />
        </div>
        <div
          v-for="column in columns"
          :key="column"
          class="relative flex items-center gap-x-1 border-b border-neutral-200 bg-white p-4"
        >
          <span
            class="text-md font-medium"
            :class="[
              {
                'cursor-pointer': sortableColumns.includes(
                  column as NonNullable<
                    AdminPanelUsersCollectionSort['attribute']
                  >
                ),
              },
              column === sort.attribute ? 'text-primary' : 'text-neutral',
            ]"
            data-test-id="sortableColumns"
            @click="
              sortableColumns.includes(
                column as NonNullable<
                  AdminPanelUsersCollectionSort['attribute']
                >
              )
                ? selectSort(
                    column as NonNullable<
                      AdminPanelUsersCollectionSort['attribute']
                    >
                  )
                : undefined
            "
          >
            {{ t(`admin.employees.columns.${column}`) }}
          </span>
          <!-- @vue-expect-error Типы не совпадают, так как не по всем колонкам может идти сортировка -->
          <div
            v-if="sortableColumns.includes(column)"
            class="flex flex-col"
            :class="{
              'rotate-180': sort.direction === 'asc',
              'cursor-pointer': sortableColumns.includes(
                column as NonNullable<
                  AdminPanelUsersCollectionSort['attribute']
                >
              ),
            }"
            data-test-id="sortableColumns"
            @click="
              sortableColumns.includes(
                column as NonNullable<
                  AdminPanelUsersCollectionSort['attribute']
                >
              )
                ? selectSort(
                    column as NonNullable<
                      AdminPanelUsersCollectionSort['attribute']
                    >
                  )
                : undefined
            "
          >
            <SvgoChevronSortDown class="w-4 rotate-180 fill-neutral-300" />
            <SvgoChevronSortDown
              class="w-4"
              :class="[
                column === sort.attribute ? 'fill-primary' : 'fill-neutral-300',
              ]"
            />
          </div>
          <div v-if="Object.keys(searchableColumns).includes(column)">
            <!-- @vue-skip Типы не совпадают, так как не по всем колонкам может идти поиск -->
            <Icon
              class="cursor-pointer"
              data-test-id="searchQueries"
              name="SvgoSearchBold"
              size="16"
              @click="searchQueries[searchableColumns[column]] = ''"
            />
            <!-- @vue-skip Типы не совпадают, так как не по всем колонкам может идти поиск -->
            <input
              v-if="searchQueries[searchableColumns[column]] !== undefined"
              v-model="searchQueries[searchableColumns[column]]"
              class="absolute inset-0 rounded-none border-0 border-b-2 border-b-primary !ring-0 placeholder:!text-neutral-400 hover:border-transparent hover:border-b-primary"
              data-test-id="searchQueries.undefined"
              :placeholder="t(`admin.employees.columns.${column}`)"
            />
            <!-- @vue-skip Типы не совпадают, так как не по всем колонкам может идти поиск -->
            <Icon
              v-if="searchQueries[searchableColumns[column]] !== undefined"
              class="absolute right-0 cursor-pointer fill-neutral"
              data-test-id="searchQueries"
              name="SvgoXClose"
              size="16"
              @click="searchQueries[searchableColumns[column]] = undefined"
            />
          </div>
        </div>
        <div class="border-b border-neutral-200" />
      </div>
      <div
        v-if="isLoading"
        class="flex h-full w-full flex-col items-center justify-center"
      >
        <LazyIcon class="text-neutral-200" name="svg-spinners:270-ring" />
      </div>
      <div v-else class="absolute flex flex-col divide-y divide-neutral-200">
        <AdminEmployeesCard
          v-for="employee in employees.data.data?.success"
          :key="employee.id"
          :employee="employee"
        />
      </div>
    </div>
    <VPagination
      v-model="pagination"
      data-test-id="pagination"
      is-admin
      :pagination="employees.data.meta?.pagination"
    />
  </div>
  <LazyEmployeesActionsReports
    v-if="isGenerateReportsVisible"
    :parent-selected-employees="employeesIds"
    :year="new Date().getFullYear()"
    @close="isGenerateReportsVisible = false"
  />
  <LazyAdminEmployeesActionsArchive
    v-if="isArchiveVisible"
    :selected-employees="selectedEmployees"
    :unarchive="showArchive"
    @close="
      () => {
        updateEmployees()
        selectedEmployees.clear()
        isArchiveVisible = false
      }
    "
  />
</template>
