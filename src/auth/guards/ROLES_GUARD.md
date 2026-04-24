# RoleGuard Visual Explanation

Use this diagram to explain how `src/auth/guards/role.guard.ts` performs authorization after `AuthGuard` finishes authentication.

## How RoleGuard Fits In

`RoleGuard` does not verify JWTs.  
It assumes `AuthGuard` already authenticated the request and attached `request.user`.

```mermaid
flowchart LR
    A[Incoming request] --> B[AuthGuard]
    B --> C[request.user is attached]
    C --> D[RoleGuard]
    D --> E[Controller handler]
```

## RoleGuard Flow Diagram

```mermaid
flowchart TD
    A[Incoming request reaches RoleGuard.canActivate] --> B[Read isPublic metadata]
    B --> C{Route is public?}
    C -->|Yes| D[Allow request]
    C -->|No| E[Read roles metadata from handler]

    E --> F{Roles metadata exists?}
    F -->|No| G[Allow request<br/>no role restriction]
    F -->|Yes| H[Read request.user]

    H --> I[Compare request.user.role with allowed roles]
    I --> J{Role included?}
    J -->|Yes| K[Allow request]
    J -->|No| L[Throw ForbiddenException]
```
