import type { UsersUserAttributeAccessRights } from "@/Api"

export interface NavigationLink {
  /** Связанное право доступа */
  accessRight?: keyof NonNullable<
    UsersUserAttributeAccessRights["access_rights"]
  >
  /** Название иконки */
  icon: string
  /** Заголовок ссылки */
  title: string
  /** URL ссылки */
  url: string
}

/** Опция */
export interface Option<TId = string | number | undefined> {
  /** `ID` опции */
  id: TId
  /** Заголовок опции */
  title: string
}

/** Вкладка */
export interface Tab<TId = string | undefined> extends Option<TId> {
  /** Счетчик */
  counter?: number
}
