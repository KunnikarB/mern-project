import Item from '../models/itemModel.js';

 export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({
      error: 'Failer to get items',
    });
  }
};

export const getItemsByName = async (req, res) => {

  try {
    const filteredItems = await Item.find({ name: 'banana'});
    res.json(filteredItems);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to filter items',
    });
  }
};

export const getItemsByQuantity = async (req, res) => {
  try {
    const items = await Item.find({ quantity: { $gt: 5 } });
    res.json(items);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get items by quantity',
    });
  }
};

export const getSortedItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ name: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to sort items',
    });
  }
};

export const getGroupedItems = async (req, res) => {
  try {
    const groupedItems = await Item.aggregate([ 
      { $group: { _id: '$name', totalQuantity: { $sum: '$quantity'}}},
    ]);
    res.json(groupedItems);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to group items',
    });
  }
};


export const getItemCount = async (req, res) => {
  try {
    const count = await Item.countDocuments();
    res.json({ totalitems: count});
  } catch (error) {
    res.status(500).json({
      error: 'Failed to count items',
    })
  }
};

export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to post items',
    });
  }
};

export const patchItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.updateOne(
      { _id: id },
      { $set: { quantity: 20 }}
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update item'
    });
  }
};

export const updateItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedItem = await Item.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found'});
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update items',
    });
  }
};

export const deleteManyItems = async (req, res) => {
  try {
    const result = await Item.deleteMany({ quantity: { $lt: 5 }});
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to delete items',
    });
  }
};

export const deleteItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found'});
    }
    res.json({ message: 'Item deleted', item: deletedItem});
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete items',
    });
  }
};