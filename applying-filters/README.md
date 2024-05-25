# Overview

This utility is about a way to apply multiple filters (from Frontend) into a given data set, getting a clean solution, dividing the problem into many functions where each one have a single responsability

## The `applyFilters` function

Main function of the solution, given a data set and an array of [`FilterValidation`](#filtervalidation-functions) functions it applies a filter where each data item must pass all of the validation functions

```ts
const applyFilters = <T>(data: T[], filters: FilterValidation<T>[]): T[] => {
  return data.filter((dataItem) => filters.every((filter) => filter(dataItem)))
}
```

## `FilterValidation` functions

They are functions that will receive each data item from the data set and decide if they accomplish the specific validation.

```ts
type FilterValidation<T> = (dataItem: T) => boolean
```

### Static filter validation

You can apply a validation that **no depends** of any value as following:

```ts
interface Person {
  name: string
  age: number
}

const adultValidation: FilterValidation<Person> = (dataItem) => {
  return dataItem.age >= 18
}
```

### Dynamic filter validation

You can apply a validation that **depends** of one or more values, for example:

```ts
interface Person {
  name: string
  age: number
}

const nameValidation =
  (name: string): FilterValidation<Person> =>
  (dataItem) => {
    return dataItem.name.includes(name)
  }
```

**Note**: Notice we're using a function that returns a `FilterValidation` function, that's because we could need to create validation functions based on dynamic values. So if you want filter by a variable whose value is `John` it will be called like:

```ts
nameValidation('John')
```

And only data items whose `name` prop includes `John` will pass the validation

## Applying the solution

To understand how to apply the functions explained, we have an example following the same topic of filtering a people data set

```ts
// Type of the data set items
interface Person {
  name: string
  age: number
  isAlive: boolean
}

// We create an auxiliar type to avoid too long line into function definition
type PersonValidation = FilterValidation<Person>

// Static filter validation function
const isAliveValidation: PersonValidation =
  (dataItem) => {
    return dataItem.isAlive
  }

// Dynamic filter validation functions
const nameSearchValidation =
  (name: string): PersonValidation =>
  (dataItem) => {
    return dataItem.name.includes(name)
  }

const minAgeValidation =
  (minAge: number): PersonValidation =>
  (dataItem) => {
    return dataItem.age >= minAge
  }

/* Applying validations into the component */

interface Props {
  people: Person[]
  // Represents the filters applied by the user
  filterValues: {
    nameSearch: string
    minAge: number
  }
}

const FilteredPeopleList = ({ people, filterValues }: Props) => {
  const filteredPeople = useMemo<Person[]>(() => {
    return applyFilters(
      people,
      [
        isAliveValidation,
        nameSearchValidation(filterValues.name),
        minAgeValidation(filterValues.minAge)
      ]
    )
  }, [people, filterValues])

  return filteredPeople.map((person) => (
    // RENDER PERSON LOGIC
  ))
}
```

## More complex example

You can see the [Deployed Example](https://utilities-six.vercel.app/) and analyze the project code to understand the solution usage.

**NOTE**: Read the following sections to know where each part of the solution applies

### `utils/productFilterValidations` file

Here are all of our validation functions that helps us to filter the products data set

### `utils/applyFilters` file

Here is defined the `applyFilters` function

### `page.tsx` file

Here are applied all of the filter validation functions, using the searchParams as our `filterValues` of the previous example

### Filter Components: `SearchFilter`, `PriceFilter`, `RatingFilter`, and `CategoryFilter`

Each one is responsible for setting the filters that the user wants to apply.
All of them are applying the filters into the URL to keep them when the user shares his URL
