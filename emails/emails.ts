export interface Email {
  /** Текст на кнопке */
  button: string
  /** Описание */
  description: string[]
  /** Заголовок */
  title: string
}

export default {
  idpActualization: {
    button: "Список целей",
    description: [
      "Напоминаем о необходимости актуализировать ваши индивидуальные планы развития в течение года.",
      "Перейдите по ссылке и проверьте статусы целей и сроки их исполнения.",
    ],
    title: "Актуализация ИПР",
  },
  idpActualizationEmployee: {
    button: "Список целей",
    description: [
      "Напоминаем о необходимости актуализировать индивидуальные планы развития в течение года.",
      "Перейдите по ссылке и проверьте для ваших подчиненных статусы целей и сроки их исполнения.",
    ],
    title: "Актуализация ИПР сотрудников",
  },
  idpApproval: {
    button: "Список целей",
    description: [
      "Вам необходимо завершить работу над списком целей по развитию в ближайшее время.",
      "Перейдите по ссылке и отправьте индивидуальный план развития на согласование.",
    ],
    title: "Согласование ИПР",
  },
  idpApprovalApproved: {
    button: "Список целей",
    description: [
      "Ваш индивидуальный план развития согласован и готов к исполнению.",
      "Перейдите по ссылке и начните работу со списком целей.",
    ],
    title: "ИПР согласован",
  },
  idpApprovalEmployee: {
    button: "Список целей",
    description: [
      "Сотрудник Иванов Иван Петрович (id 3002345) подготовил индивидуальный план развития и отправил его на согласование.",
      "Вас назначили согласующим, и на текущем этапе от вас требуется подтверждение.",
      "Перейдите по ссылке ниже и ознакомьтесь со списком целей.",
    ],
    title: "Согласование ИПР сотрудника",
  },
  idpApprovalEmployeeUrgent: {
    button: "Список целей",
    description: [
      "Сотрудник Иванов Иван Петрович (id 3002345) подготовил индивидуальный план развития и отправил его на согласование, но так и не получил вашего решения.",
      "Вас назначили согласующим, и на текущем этапе от вас требуется подтверждение. Просим вас сделать это в ближайшее время.",
      "Перейдите по ссылке ниже и ознакомьтесь со списком целей.",
    ],
    title: "Согласование ИПР сотрудника",
  },
  idpApprovalEmployees: {
    button: "Список сотрудников",
    description: [
      "Следующие сотрудники подготовили индивидуальные планы развития и отправили его на согласование:",
      "• Иванов Иван Петрович (id 3002345)",
      "• Петров Семен Владимирович (id 3002346)",
      "Вас назначили согласующим, и на текущем этапе от вас требуется подтверждение.",
      "Перейдите по ссылке ниже и ознакомьтесь со списком целей.",
    ],
    title: "Согласование ИПР сотрудников",
  },
  idpApprovalEmployeesUrgent: {
    button: "Список сотрудников",
    description: [
      "Следующие сотрудники подготовили индивидуальные планы развития и отправили его на согласование, но так и не получили вашего решения:",
      "• Иванов Иван Петрович (id 3002345)",
      "• Петров Семен Владимирович (id 3002346)",
      "Вас назначили согласующим и на текущим этапе от вас требуется подтверждение. Просим вас сделать это в ближайшее время.",
      "Перейдите по ссылке ниже и ознакомьтесь со списком целей.",
    ],
    title: "Согласование ИПР сотрудников",
  },
  idpApprovalRejected: {
    button: "Список целей",
    description: [
      "Ваш индивидуальный план развития отправили на доработку.",
      "Перейдите по ссылке и внесите правки в свой список целей.",
    ],
    title: "ИПР отправлен на доработку",
  },
  idpComment: {
    button: "Мой ИПР",
    description: [
      "К одной из целей в вашем индивидуальном плане развития был добавлен новый комментарий.",
      "Перейдите по ссылке и ознакомьтесь с ним.",
    ],
    title: "Новый комментарий в ИПР",
  },
  idpCommentEmployee: {
    button: "Новый комментарий",
    description: [
      "У сотрудника Иванов Иван Петрович (id 3002345) есть новый комментарий в индивидуальном плане развития.",
      "Перейдите по ссылке и ознакомьтесь с ними.",
    ],
    title: "Новый комментарий в ИПР сотрудника",
  },
  idpComments: {
    button: "Мой ИПР",
    description: [
      "К целям в вашем индивидуальном плане развития были добавлены новые комментарии.",
      "Перейдите по ссылке и ознакомьтесь с ними.",
    ],
    title: "Новые комментарии в ИПР",
  },
  idpCommentsEmployee: {
    button: "Список сотрудников",
    description: [
      "У следующих сотрудников есть новые комментарии в индивидуальных планах развития:",
      "• Иванов Иван Петрович (id 3002345)",
      "• Петров Семен Владимирович (id 3002346)",
      "Перейдите по ссылке и ознакомьтесь с ними.",
    ],
    title: "Новые комментарии в ИПР сотрудников",
  },
  idpDeadline: {
    button: "Список целей",
    description: [
      "У вас есть цель, по которой подходит дедлайн.",
      "Перейдите по ссылке и проверьте статус цели и срок ее исполнения.",
    ],
    title: "Дедлайн",
  },
  idpDeadlineEmployee: {
    button: "Список целей",
    description: [
      "У сотрудника Иванов Иван Петрович (id 3002345) есть цель в индивидуальном плане развития, по которой подходит дедлайн.",
      "Перейдите по ссылке и проконтролируйте ее исполнение.",
    ],
    title: "Дедлайн в ИПР сотрудника",
  },
  idpDeadlines: {
    button: "Список целей",
    description: [
      "У вас есть несколько целей, по которым подходит дедлайн.",
      "Перейдите по ссылке и проверьте статусы целей и сроки их исполнения.",
    ],
    title: "Дедлайн",
  },
  idpDeadlinesEmployee: {
    button: "Список сотрудников",
    description: [
      "У следующих сотрудников есть цели в индивидуальных планах развития, по которым подходит дедлайн:",
      "• Иванов Иван Петрович (id 3002345)",
      "• Петров Семен Владимирович (id 3002346)",
      "Перейдите по ссылке и проконтролируйте их исполнение.",
    ],
    title: "Дедлайн в ИПР сотрудников",
  },
  idpExpired: {
    button: "Список целей",
    description: [
      "У вас есть просроченная цель.",
      "Перейдите по ссылке и проверьте статус цели и срок ее исполнения.",
    ],
    title: "Просроченная цель",
  },
  idpExpiredEmployee: {
    button: "Список целей",
    description: [
      "У сотрудника Иванов Иван Петрович (id 3002345) есть просроченная цель в индивидуальном плане развития.",
      "Перейдите по ссылке и проконтролируйте ее исполнение.",
    ],
    title: "Просроченная цель у сотрудника",
  },
  idpExpiredMultiple: {
    button: "Список целей",
    description: [
      "У вас есть несколько просроченных целей.",
      "Перейдите по ссылке и проверьте статусы целей и сроки их исполнения.",
    ],
    title: "Просроченные цели",
  },
  idpExpiredMultipleEmployee: {
    button: "Список сотрудников",
    description: [
      "У следующих сотрудников есть просроченные цели в индивидуальных планах развития:",
      "• Иванов Иван Петрович (id 3002345)",
      "• Петров Семен Владимирович (id 3002346)",
      "Перейдите по ссылке и проконтролируйте их исполнение.",
    ],
    title: "Просроченные цели у сотрудников",
  },
  idpResult: {
    button: "Список целей",
    description: [
      "Напоминаем о необходимости подвести итог по вашему индивидуальному плану развития.",
      "Перейдите по ссылке и проверьте статусы целей и сроки их исполнения.",
    ],
    title: "Итоги по ИПР",
  },
  idpResultEmployee: {
    button: "Список сотрудников",
    description: [
      "Напоминаем о необходимости подвести итог по индивидуальным планам развития.",
      "Перейдите по ссылке и проверьте для ваших подчиненных статусы целей и сроки их исполнения.",
    ],
    title: "Итоги по ИПР сотрудников",
  },
  idpTarget: {
    button: "Список целей",
    description: [
      "В ваш индивидуальный план развития добавлена новая цель.",
      "Перейдите по ссылке и ознакомьтесь с ней.",
    ],
    title: "Новая цель",
  },
  idpTargetEmployee: {
    button: "Список целей",
    description: [
      "У сотрудника Иванов Иван Петрович (id 3002345) есть новая цель в согласованном индивидуальном плане развития.",
      "Перейдите по ссылке и ознакомьтесь с ней",
    ],
    title: "Новая цель в ИПР сотрудника",
  },
  idpTargets: {
    button: "Список целей",
    description: [
      "В ваш индивидуальный план развития добавлены новые цели.",
      "Перейдите по ссылке и ознакомьтесь с ними.",
    ],
    title: "Новые цели",
  },
  idpTargetsEmployee: {
    button: "Список сотрудников",
    description: [
      "У следующих сотрудников есть новые цели в согласованных индивидуальных планах развития:",
      "• Иванов Иван Петрович (id 3002345)",
      "• Петров Семен Владимирович (id 3002346)",
      "Перейдите по ссылке и ознакомьтесь с ними.",
    ],
    title: "Новые цели в ИПР сотрудника",
  },
  newEmployeeIpr: {
    button: "План развития",
    description: [
      "Сотруднику Иванов Иван Петрович (id 3002345) создали новый индивидуальный план развития.",
      "Вы являетесь руководителем и можете контролировать наполнение плана своего подчиненного.",
      "Перейдите по ссылке ниже и ознакомьтесь с предварительным списком целей.",
    ],
    title: "Новый ИПР сотрудника",
  },
  newEmployeesIpr: {
    button: "Список сотрудников",
    description: [
      "Следующим сотрудникам создали новые индивидуальные планы развития:",
      "• Иванов Иван Петрович (id 3002345)",
      "• Петров Семен Владимирович (id 3002346)",
      "Перейдите по ссылке ниже и ознакомьтесь с предварительным списком целей.",
    ],
    title: "Новые ИПР сотрудников",
  },
  newIpr: {
    button: "Мой план развития",
    description: [
      "Вам создали новый индивидуальный план развития.",
      "Перейдите по ссылке и добавьте цели или ознакомьтесь с целями, которые поставили ваши руководители или HR.",
    ],
    title: "Новый ИПР",
  },
  reset: {
    button: "Задать новый пароль",
    description: [
      "Вы запросили восстановление пароля к вашей учетной записи. Перейдите в приложение и задайте новый пароль.",
      "Если это были не вы, проигнорируйте это письмо, ваш пароль останется прежним.",
    ],
    title: "Восстановление пароля",
  },
} satisfies Record<string, Email>