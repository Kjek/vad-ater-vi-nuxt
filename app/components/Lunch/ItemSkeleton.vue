<template>
  <div class="border-b p-6 break-words whitespace-pre-line last:border-none sm:flex">
    <div class="flex w-1/3 justify-center">
      <USkeleton
        as="h2"
        class="h-9 w-42"
      />
    </div>
    <div class="sm:w-2/3 sm:grow">
      <UPageList
        class="gap-4"
        as="ul"
      >
        <li>
          <div class="flex pb-2">
            <USkeleton
              class="h-8 w-32 text-2xl font-bold"
              as="h3"
            />
          </div>
          <div class="flex flex-col gap-2">
            <USkeleton
              class="h-7 grow pb-2 text-lg"
              as="p"
            />
            <USkeleton
              class="h-7 w-1/3 text-lg"
              as="p"
            />
          </div>
        </li>
      </UPageList>
      <UPageList
        class="flex flex-col gap-4 pt-6"
        as="ul"
      >
        <li>
          <div class="flex flex-col gap-2">
            <USkeleton
              class="h-6 w-60"
              as="h4"
            />
            <USkeleton
              class="h-7 grow"
              as="h5"
            />
          </div>
        </li>
        <li>
          <div class="flex flex-col gap-2">
            <USkeleton
              class="h-6 w-60"
              as="h4"
            />
            <USkeleton
              class="h-7 grow"
              as="h5"
            />
          </div>
        </li>
      </UPageList>
    </div>
  </div>
</template>
