export default {
  getItems(self) {
    fetch('http://localhost:8001/items', {
      method: 'GET',
    })
    .then(response => response.json())
    .then((data) => {
      data = data.map(item => Object.assign(item, {
        editingTitle: !item.title,
      }));

      self.setState({ items: data });
    });
  },

  createItem(self, index) {
    const item = self.state.items[index];
    const itemObj = {
      title: item.title,
      completed: item.completed,
    }

    fetch('http://localhost:8001/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemObj),
    })
    .then(response => response.json())
    .then((data) => {
      this.getItems(self);
    });
  },

  deleteItem(self, index) {
    const item = self.state.items[index];

    fetch(`http://localhost:8001/items/${item._id}`, {
      method: 'DELETE',
    })
    .then((data) => {
      this.getItems(self);
    });
  },

  updateItem(self, index) {
    const item = self.state.items[index];
    const itemObj = {
      id: item._id,
      title: item.title,
      completed: item.completed,
    }

    fetch(`http://localhost:8001/items/${item._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemObj),
    })
    .then(response => response.json())
    .then((data) => {
      this.getItems(self);
    });
  }

}