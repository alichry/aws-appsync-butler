---
id: "ValidationError"
title: "Class: ValidationError"
sidebar_label: "ValidationError"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Error`

  ↳ **`ValidationError`**

  ↳↳ [`DataSourceTypeMismatchError`](DataSourceTypeMismatchError)

  ↳↳ [`DataSourceNotFoundError`](DataSourceNotFoundError)

  ↳↳ [`FunctionNotFoundError`](FunctionNotFoundError)

  ↳↳ [`PipelineValidationError`](PipelineValidationError)

  ↳↳ [`UndefinedVariableError`](UndefinedVariableError)

  ↳↳ [`InvalidDirectiveError`](InvalidDirectiveError)

  ↳↳ [`DirectoryValidationError`](DirectoryValidationError)

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

## Properties

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

___

### name

• **name**: `string`

#### Inherited from

Error.name

___

### message

• **message**: `string`

#### Inherited from

Error.message

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

## Constructors

### constructor

• **new ValidationError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

Error.constructor
