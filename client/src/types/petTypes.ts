type PetStatus = {
    status: string;
}

export type PetType = {
    id: number;
    name: string;
    petStatusId: number;
    categoryId: number;
    colorId: number;
    description: string;
    location: string;
    image: string;
    hasCollar: boolean;
    contactInfo: string;
    date: string;
    requestStatusId: number;
    userId: number;
    PetStatus: PetStatus;
}

export type PetFormDataType = {
    name: string;
    /** Идентификатор статуса питомца. Например, найден, потерян и т.д. Это значение ссылается на таблицу статусов питомцев. */
    petStatusId: number;
    /** Идентификатор категории питомца. Например, кошка, собака и т.д. Это значение ссылается на таблицу категорий. Может быть `null`, если категория не указана. */
    categoryId: number;
    /** Идентификатор цвета питомца. Это значение ссылается на таблицу цветов. Может быть `null`, если цвет не указан. */
    colorId: number | null;
    /** Описание питомца. Может включать в себя особенности внешнего вида, поведение, особые приметы и т.д. */
    description: string;
    /** Местоположение, где был найден или потерян питомец, или место, где его видели в последний раз. */
    location: string;
    /** Логическое значение, указывающее, есть ли у питомца ошейник. `true` означает, что ошейник есть, `false` - нет. */
    hasCollar: boolean;
    /** Контактная информация для связи с человеком, который нашел или потерял питомца. Может включать телефонный номер, email и т.д. */
    contactInfo: string;
    /** Дата, связанная с питомцем, в формате строки по стандарту ISO 8601. Это может быть дата, когда питомец был найден или потерян. */
    date: string; // ISO 8601 date string
}

export type CategoryType = {
    id: number;
    name: string;
  };
  
  export type ColorType = {
    id: number;
    name: string;
  };

// export type NewPetFormLostData = Omit<NewPetFormFoundData, 'name'>
