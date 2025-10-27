<template>
  <UHeader
    title="Lunch i Sundsvall"
    :toggle="false"
  >
    <template #title>
      <AppLogo class="h-6 w-auto shrink-0" />
      <h1>Lunch i Sundsvall</h1>
    </template>

    <template #right>
      <UColorModeButton />

      <UButton
        label="Logout"
        color="neutral"
        variant="outline"
        type="button"
        @click="onLogout"
      />
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
const { signOut } = useAuth();
const onLogout = async () => {
  await signOut({ redirect: false });
  navigateTo('/login');
};
</script>
