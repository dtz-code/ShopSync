using API.Entities.Models;

namespace API.Services
{
    internal class UserService : ServiceBase, IUserService
    {
        public UserService(ApiDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
        public async Task<UserDto?> Get(int id)
        {
            var user = await _context.Users
                .Where(c => c.Id == id)
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            return user;
        }
        public async Task<IEnumerable<UserDto>> GetAll()
        {
            var users = await _context.Users
                .OrderBy(c => c.Username)
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return users;
        }

        public async Task<UserDto?> Save(UserDto categoryDto)
        {
            var user = _mapper.Map<User>(categoryDto);

            if (user.Id <= 0)
            {
                await _context.Users.AddAsync(user);
            }
            else
            {
                var existingUser = await _context.Users
                    .AsTracking()
                    .Where(c => c.Id == user.Id)
                    .FirstOrDefaultAsync();

                if (existingUser == null)
                {
                    return null;
                }

                _context.Entry(existingUser).CurrentValues.SetValues(user);

                user = existingUser;
            }

            await _context.SaveChangesAsync();

            return _mapper.Map<UserDto>(user);
        }

        public async Task<IEnumerable<UserDto>> Save(IEnumerable<UserDto> categoriesDto)
        {
            var existingUserIds = categoriesDto
               .Where(c => c.Id > 0)
               .Select(c => c.Id);

            var existingUser = await _context.Users
                .AsTracking()
                .Where(c => existingUserIds.Contains(c.Id))
                .ToListAsync();

            var newUser = categoriesDto.Where(c => c.Id <= 0)
                .Select(_mapper.Map<User>)
                .ToList();

            foreach (var categoryDto in categoriesDto)
            {
                var existingCategory = existingUser.FirstOrDefault(c => c.Id == categoryDto.Id);
                if (existingCategory != null)
                {
                    _mapper.Map(categoryDto, existingCategory);
                }
            }

            _context.Users.AddRange(newUser);

            await _context.SaveChangesAsync();

            var savedUser = newUser.Concat(existingUser);
            return _mapper.Map<IEnumerable<UserDto>>(savedUser);
        }

        public async Task<UserDto?> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }

            return _mapper.Map<UserDto>(user);
        }

        public async Task<int> Delete(IEnumerable<int> ids)
        {
            var entityIdsParameter = string.Join(",", ids.ToArray());
            string? tableName = GetTableName<User>();

            var deleteSql = $"DELETE FROM {tableName} WHERE Id IN ({entityIdsParameter})";

            var affectedRows = await _context.Database.ExecuteSqlRawAsync(deleteSql);

            return affectedRows;
        }
        public async Task<int> LogIn(UserDto User)
        {
            var user = await _context.Users
               .Where(u => u.Username == User.Username && u.Password == User.Password)
               .FirstOrDefaultAsync();

            if (user != null)
            {
                return 200;
            }
            else
            {
                return 404;
            }
        }
    }
}
