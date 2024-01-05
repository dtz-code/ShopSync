﻿using API.Entities.Models;

namespace API.Entities
{
    public class ShoppingList: BaseModel
    { 
        public string Title { get; set; }
        public int UserId { get; set; } 
        public List<ListItem> ListItems { get; set; } = new List<ListItem>(); 
    }
}
