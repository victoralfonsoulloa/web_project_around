export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}


// handler: (formData) => {
//       const newCard = new Section(
//         {
//           items: card,
//           renderer: (cardItem) => {
//             const cardHandler = new Card(
//               formData.name,
//               formData.link,
//               "#card-template",
//               handleCardClick
//             );
//             const cardInstance = cardHandler.generateCard();
//             cardList.addItem(cardInstance);
//           },
//         },
//         ".cards"
//       );
//       newCard.renderItems();
//     },
//   });
// }