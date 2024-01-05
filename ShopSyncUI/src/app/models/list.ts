import { CategoryService } from '../services/auth/assignCategory.service';
import { Category } from './category';
import { categoriesAndItems } from './categories-items';
import { Item } from './item';
import { UUID } from 'uuid-generator-ts';
import { User } from './user';

export class List {
  name: string;
  categories: Category[];
  users: User[] | null;
  creator: User | null;
  lastChanged: Date;
  lastChangedBy: User | null;

  constructor(
    name: string,
    categories: Category[],
    users: User[] | null,
    lastChanged: Date,
    creator: User | null
  ) {
    this.name = name;
    this.categories = categories;
    this.users = users;
    this.creator = creator;
    this.lastChanged = lastChanged;
    this.lastChangedBy = creator;
  }

  setChangeSettings(user: User | null, changeDate: Date) {
    this.lastChanged = changeDate;
    this.lastChangedBy = user;
  }

  getListDateAsString() {
    const lastChangedDate = new Date(this.lastChanged);
    const now = new Date();

    if (
      now.getFullYear() === lastChangedDate.getFullYear() &&
      now.getMonth() === lastChangedDate.getMonth() &&
      now.getDate() === lastChangedDate.getDate()
    ) {
      // Das Datum ist heute
      return `heute um ${lastChangedDate.getHours()}:${String(
        lastChangedDate.getMinutes()
      ).padStart(2, '0')} Uhr`;
    } else {
      // Das Datum ist nicht heute
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };

      return `am ${lastChangedDate.toLocaleDateString(
        undefined,
        options
      )} um ${lastChangedDate.getHours()}:${String(
        lastChangedDate.getMinutes()
      ).padStart(2, '0')} Uhr`;
    }
  }

  addItem(givenCategory: string, item: Item) {
    console.log(givenCategory, item);
    let chosenCategory: string = '';
    let catUsed: boolean = false;
    if (givenCategory != null) {
      this.categories.forEach((category) => {
        if (category.id === givenCategory) {
          const uuid = new UUID();
          category.items.push(item);
          catUsed = true;
          chosenCategory = category.name;
        }
      });
      if (catUsed === false) {
        console.log('false');
        let categoryName = this.getCategoryNameById(givenCategory);
        console.log(categoryName);
        if (categoryName != null) {
          this.categories.push(
            new Category(givenCategory, categoryName, [item])
          );
          chosenCategory = categoryName;
        }
      }
    }
    return chosenCategory;
  }

  getCategoryNameById(id: string): string | null {
    for (const mainCategory in categoriesAndItems) {
      if (categoriesAndItems.hasOwnProperty(mainCategory)) {
        const mainCategoryObj = categoriesAndItems[mainCategory];
        for (const subCategory in mainCategoryObj) {
          if (mainCategoryObj.hasOwnProperty(subCategory)) {
            const category = mainCategoryObj[subCategory];
            if (category.id === id) {
              return subCategory;
            }
          }
        }
      }
    }
    return null;
  }

  checkIfItemExists(newItem: Item) {
    let foundItem: Item | undefined;
    this.categories.forEach((category) => {
      category.items.forEach((item) => {
        if (item.name === newItem.name) {
          foundItem = item;
        }
      });
    });
    return foundItem;
  }

  deleteItem(categoryInput: Category, itemInput: Item) {
    const cat = this.categories.filter(
      (category) => category.id == categoryInput.id
    );
    const deleteItem = cat[0].items.filter((item) => item.id == itemInput.id);
    console.log(deleteItem);
    const index = cat[0].items.indexOf(itemInput, 0);
    if (index > -1) {
      cat[0].items.splice(index, 1);
    }
  }
}
