---
id: "FunctionNotFoundError"
title: "Class: FunctionNotFoundError"
sidebar_label: "FunctionNotFoundError"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`ValidationError`](ValidationError)

  ↳ **`FunctionNotFoundError`**

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

[ValidationError](ValidationError).[captureStackTrace](ValidationError#capturestacktrace)

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

[ValidationError](ValidationError).[prepareStackTrace](ValidationError#preparestacktrace)

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[ValidationError](ValidationError).[stackTraceLimit](ValidationError#stacktracelimit)

___

### functionName

• `Readonly` **functionName**: `string`

___

### name

• **name**: `string`

#### Inherited from

[ValidationError](ValidationError).[name](ValidationError#name)

___

### message

• **message**: `string`

#### Inherited from

[ValidationError](ValidationError).[message](ValidationError#message)

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[ValidationError](ValidationError).[stack](ValidationError#stack)

## Constructors

### constructor

• **new FunctionNotFoundError**(`message`, `functionName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `functionName` | `string` |

#### Overrides

[ValidationError](ValidationError).[constructor](ValidationError#constructor)
