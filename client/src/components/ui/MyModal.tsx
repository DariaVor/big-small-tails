import React from 'react'

export default function MyModal(): JSX.Element {
  return (


    {showButtons && user.roleId === 1 && (
      <AppModal
        title="Изменить информацию о питомце"
        buttonText="Редактировать"
        buttonVariant="bg-indigo-600 hover:bg-indigo-500 text-white"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        {(closeModal) => (
          <form onSubmit={(e) => handleEditPet(e, closeModal)}>
            <div className="mb-3">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Имя
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Введите имя питомца"
                value={editedPet.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="categoryId"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Категория
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={editedPet.categoryId || ''}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Выберите категорию</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label
                htmlFor="colorId"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Цвет
              </label>
              <select
                id="colorId"
                name="colorId"
                value={editedPet.colorId || ''}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Выберите цвет</option>
                {colors.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.color}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Описание
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                placeholder="Введите описание"
                value={editedPet.description}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="location"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Локация
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Введите локацию"
                value={editedPet.location || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="hasCollar"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Наличие ошейника
              </label>
              <input
                id="hasCollar"
                name="hasCollar"
                type="checkbox"
                checked={editedPet.hasCollar}
                onChange={(e) =>
                  setEditedPet((prev) => ({ ...prev, hasCollar: e.target.checked }))
                }
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="contactInfo"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Контактная информация
              </label>
              <input
                id="contactInfo"
                name="contactInfo"
                type="text"
                placeholder="Введите контактную информацию"
                value={editedPet.contactInfo || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                Дата
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={editedPet.date || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                Картинка
              </label>
              <input
                id="image"
                name="file"
                type="file"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                Сохранить
              </button>
            </div>
          </form>
        )}
      </AppModal>
    )}


  )
}

