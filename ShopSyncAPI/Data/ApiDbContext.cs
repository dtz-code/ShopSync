using API.Entities;
using API.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Linq;

namespace API.Data
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<ShoppingList> ShoppingLists { get; set; }
        public DbSet<ListItem> ListItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            CreateQueryFilters(modelBuilder);
        }

        private static void CreateModelConfigurations(ModelBuilder modelBuilder)
        { 

        }

        private static void CreateQueryFilters(ModelBuilder modelBuilder)
        {
        //    modelBuilder.Entity<User>().HasQueryFilter(p => p.IsHidden != true);
        //    modelBuilder.Entity<ShoppingList>().HasQueryFilter(p => p.IsHidden != true);
        //    modelBuilder.Entity<ListItem>().HasQueryFilter(p => p.IsHidden != true);
        }
    }
}
