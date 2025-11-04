# 🤔 `defineGenome` vs `defineCapabilityGenome` - Decision

## 📊 **Current State**

### **`defineGenome` Status** ✅
- ✅ **EXISTS**: Defined in `marketplace/types/define-genome.ts`
- ✅ **EXPORTED**: Re-exported in `index.ts` and `index.d.ts`
- ✅ **TYPED**: Uses `TypedGenome` interface (module-based)
- ✅ **FUNCTIONAL**: Works correctly

### **Usage**
- **Only 1 genome uses it**: `01-hello-world.genome.ts`
- **All other genomes**: Use `defineCapabilityGenome` (13 genomes)

---

## 🎯 **Two Options**

### **Option 1: Keep Both** ✅ **RECOMMENDED**

**Rationale**:
- `defineGenome` is simpler for infrastructure-only genomes (no business capabilities)
- `defineCapabilityGenome` is for genomes with business capabilities
- Provides flexibility for different use cases
- `hello-world` is intentionally kept simple

**Pros**:
- ✅ Clear separation: module-based vs capability-based
- ✅ Simpler API for infrastructure-only genomes
- ✅ No migration needed for hello-world
- ✅ Both serve distinct purposes

**Cons**:
- ⚠️ Two ways to define genomes (could be confusing)
- ⚠️ Need to maintain both type systems

---

### **Option 2: Remove `defineGenome`, Migrate Everything** ❌ **NOT RECOMMENDED**

**What it means**:
- Convert `hello-world` to `defineCapabilityGenome` with `capabilities: {}`
- Remove `defineGenome` and `TypedGenome` entirely
- Only use capability-first approach

**Pros**:
- ✅ Single way to define genomes
- ✅ Less code to maintain
- ✅ Consistent approach

**Cons**:
- ❌ Makes simple genomes unnecessarily complex
- ❌ `capabilities: {}` feels verbose for infrastructure-only
- ❌ Less intuitive for beginners (hello-world)
- ❌ Requires migration

---

## 💡 **Recommendation: Keep Both**

### **Reasoning**

1. **Different Use Cases**:
   - `defineGenome`: Simple infrastructure genomes (framework, UI, tools)
   - `defineCapabilityGenome`: Genomes with business capabilities (auth, payments, etc.)

2. **Hello-World Philosophy**:
   - The whole point of hello-world is to be **simple**
   - Using `defineCapabilityGenome` with empty capabilities feels wrong
   - Module-based is more intuitive for beginners

3. **Clear Mental Model**:
   - Module-first = infrastructure, frameworks, tools
   - Capability-first = business features, auth, payments, etc.

4. **Migration Path**:
   - As users add features, they naturally migrate from `defineGenome` → `defineCapabilityGenome`
   - This is a natural progression

---

## ✅ **Proposed Decision: Keep Both**

### **Action Items**:
1. ✅ **Keep `defineGenome`** - It's useful for simple genomes
2. ✅ **Keep `defineCapabilityGenome`** - For capability-driven genomes
3. ✅ **Document the difference** clearly
4. ✅ **Make it explicit when to use which**:
   - Use `defineGenome` for: infrastructure-only, frameworks, tools
   - Use `defineCapabilityGenome` for: genomes with business capabilities

### **Documentation Update Needed**:
- Add clear guidance on when to use each
- Explain the progression: simple → capability-driven
- Show examples of both approaches

---

**Status**: ✅ **RECOMMENDATION: Keep both `defineGenome` and `defineCapabilityGenome`**

