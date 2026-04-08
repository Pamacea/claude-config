# NestJS Patterns

**Type:** knowledge
**Summary:** Patterns for NestJS development including controllers, services, modules, and dependency injection decorators.
**Tags:** #nestjs #backend #api
**Status:** active
**Updated:** 2026-04-08
**Related:** []

> **Version:** 1.0.0 | **Category:** Cat 4 (Patterns) | **Difficulty:** Intermediate
> **Auto-Activation:** "nest controller", "nest service", "nest module", "nestjs decorator"
> **Tags:** [nestjs, backend, typescript, dependency-injection, decorators]
> **Related:** [typescript-patterns], [rust-axum]
> **Last Updated:** 2025-04-06

---

##  Auto-Activation

**This skill auto-activates when:**
- Building NestJS APIs
- Creating controllers, services, modules
- Implementing guards, interceptors, pipes
- Configuring dependency injection
- Using NestJS ecosystem

**Progressive Disclosure:**
1. **Metadata** → Core concepts
2. **Instructions** → Common patterns
3. **Resources** → Advanced features

---

##  Quick Start

```bash
# Create NestJS app
npm i -g @nestjs/cli
nest new project

# Generate resources
nest g module users
nest g controller users
nest g service users
```

---

##  Quick Reference

| Concept | Decorator | Purpose |
|---------|-----------|---------|
| **Controller** | `@Controller()` | Route handling |
| **Service** | `@Injectable()` | Business logic |
| **Module** | `@Module()` | Organization |
| **Guard** | `@UseGuards()` | Authorization |
| **Pipe** | `@Pipe()` | Validation |

---

##  Core Concepts

### Module Structure

```typescript
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [AuthModule],
})
export class UsersModule {}
```

### Dependency Injection

```typescript
// Service
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
}

// Controller
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
}
```

---

##  Implementation Patterns

### Pattern 1: CRUD with Prisma

```typescript
// users.service.ts
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(dto: CreateUserDto) {
    return this.prisma.user.create({ data: dto });
  }

  async update(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
```

### Pattern 2: Validation Pipes

```typescript
// create-user.dto.ts
export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(18)
  age: number;
}

// Controller
@Post()
@UsePipes(new ValidationPipe({ whitelist: true }))
async create(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto);
}
```

### Pattern 3: Guards for Authorization

```typescript
// auth.guard.ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    return this.jwt.verify(token);
  }
}

// Usage
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {}
```

---

##  Quality Gates

### Validation Checklist

- [ ] DTOs use class-validator decorators
- [ ] Services handle errors properly
- [ ] Guards protect private routes
- [ ] Modules export only what's needed
- [ ] Circular dependencies avoided

### Acceptance Criteria

- **Validation:** All input validated via DTOs
- **Error Handling:** Consistent error responses
- **Security:** Guards on protected routes
- **Type Safety:** Full TypeScript coverage

---

##  Troubleshooting

| Symptom | Root Cause | Solution |
|---------|-----------|----------|
| "Cannot resolve module" | Not exported | Check module exports |
| "Circular dependency" | Wrong import order | Use forwardRef() |
| "Validation not working" | Pipe not applied | Add @UsePipes() |
| "Provider not found" | Not in module | Check providers array |

---

##  Best Practices

### Folder Structure

```
src/
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   └── entities/
│       └── user.entity.ts
```

### Exception Filters

```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    return response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}

// Usage
@UseFilters(new HttpExceptionFilter())
export class UsersController {}
```

---

##  Advanced Topics

### Interceptors

```typescript
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log(`Request: ${request.method} ${request.url}`);
    return next.handle().pipe(
      tap(() => console.log('Response sent'))
    );
  }
}
```

### Custom Decorators

```typescript
// Create param decorator
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// Usage
@Get('profile')
getProfile(@User() user: User) {
  return user;
}
```

---

##  Related Skills

- **Prerequisite:** `typescript-patterns`
- **Related:** `rust-axum` - Alternative backend
- **Complementary:** `documentation-patterns` - API docs

---

##  Further Reading

- [NestJS Documentation](https://docs.nestjs.com/)
- [NestJS Recipes](https://docs.nestjs.com/recipes)
- [Class Validator](https://github.com/typestack/class-validator)

---

##  Success Criteria

Implementation is complete when:
- [ ] DTOs validate all input
- [ ] Services are testable (mocked deps)
- [ ] Guards protect routes
- [ ] Error responses are consistent
- [ ] Modules are loosely coupled

---

*Version: 1.0.0 | NestJS Patterns*
