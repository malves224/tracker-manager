const checkPermision = (item,permissions) => permissions
  .some((permItem) => item.route === permItem.page);

const getItemsNavAllowed = (permissions, itemsNav) => {
  let permItems = [];
  itemsNav.forEach((item) => {
    item.subItemsDropdown.length === 0
     && checkPermision(item, permissions) && permItems.push(item);

    const itemMenuWithDropDown = {
      ...item,
      subItemsDropdown: [],
    };

    item.subItemsDropdown.forEach((subItem) => checkPermision(subItem, permissions) 
          && itemMenuWithDropDown.subItemsDropdown.push(subItem));

    itemMenuWithDropDown.subItemsDropdown.length > 0 
        && permItems.push(itemMenuWithDropDown);
  });
  return permItems;
};

export {
  checkPermision,
  getItemsNavAllowed,
};