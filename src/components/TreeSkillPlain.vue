<template>
  <v-treeview :items="items" item-value="id">
    <template #title="{ item }">
      <p>
        {{ item.name }}
        <span v-if="item.level && !readonly" class="text-blue px-1">
          &Delta; Level: {{ item.level }}</span
        >
        <v-btn
          density="compact"
          icon="mdi-plus-circle"
          variant="text"
          v-if="!readonly && item.children"
          class="mb-1"
        >
          <v-icon icon="mdi-plus-circle"></v-icon>
          <v-dialog activator="parent">
            <template #default="{ isActive }">
              <v-card min-width="400" maxWidth="800" class="mx-auto">
                <template #title>
                  <p>{{ item.name }} &RightArrow; Add Child</p>
                  <v-divider class="mt-2"></v-divider>
                </template>
                <template #text>
                  <v-combobox
                    label="Available Skill"
                    :items="availableSkills"
                    item-title="name"
                    v-model="selectedItem"
                  ></v-combobox>
                  <v-checkbox v-model="needChildren" label="Have children"></v-checkbox>
                </template>
                <template #actions>
                  <v-btn
                    color="error"
                    variant="text"
                    @click="delChild(item.id, items!), (isActive.value = false)"
                    >Delete</v-btn
                  >
                  <v-btn variant="text" @click="isActive.value = false">Cancel</v-btn>
                  <v-btn
                    color="info"
                    variant="text"
                    :disabled="handleDisableBtn(selectedItem, item.id)"
                    @click="
                      addChild(item.id, selectedItem!, items!, needChildren),
                        (isActive.value = false)
                    "
                    >Add</v-btn
                  >
                </template>
              </v-card>
            </template>
          </v-dialog>
        </v-btn>
      </p>
    </template>
    <template #prepend="{ item }">
      <v-icon v-if="!item.children && item.icon" :icon="item.icon"></v-icon>
    </template>
    <template #append="{ item }">
      <div v-if="item.description && readonly">
        <v-icon icon="mdi-information"> </v-icon>
        <v-dialog activator="parent">
          <template #default="{ isActive }">
            <v-card maxWidth="800" class="mx-auto">
              <template #title>
                <p>
                  {{ item.name }}
                </p>
                <v-divider class="mt-2"></v-divider>
              </template>
              <template #text>
                <p>
                  {{ item.description }}
                </p>
              </template>
              <template #actions>
                <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </div>
      <div v-if="!readonly && !item.children">
        <v-icon icon="mdi-pencil"> </v-icon>
        <v-dialog activator="parent">
          <template #default="{ isActive }">
            <v-card maxWidth="800" min-width="400" class="mx-auto">
              <template #title>
                <p>{{ item.name }} &RightArrow; Edit</p>
                <v-divider class="mt-2"></v-divider>
              </template>
              <template #text>
                <v-combobox
                  label="Replace Skill"
                  :items="availableSkills"
                  item-title="name"
                  v-model="selectedItem"
                ></v-combobox>
                <!-- <v-select label="Level" :items="[1, 2, 3, 4, 5]" variant="outlined"></v-select>
                <v-textarea
                  label="Description"
                  variant="outlined"
                  v-model="item.description"
                ></v-textarea> -->
              </template>
              <template #actions>
                <v-btn
                  color="error"
                  variant="text"
                  @click="delChild(item.id, items!), (isActive.value = false)"
                  >Delete</v-btn
                >
                <v-btn variant="text" @click="isActive.value = false">Cancel</v-btn>
                <v-btn
                  color="info"
                  :disabled="handleDisableBtn(selectedItem, item.id)"
                  variant="text"
                  @click="replaceChild(selectedItem!, items!), (isActive.value = false)"
                  >Save</v-btn
                >
              </template>
            </v-card>
          </template>
        </v-dialog>
      </div>
    </template>
  </v-treeview>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Skill {
  id: string
  name: string
  description?: string
  level?: string
  icon?: string
  children?: Skill[]
}

defineProps<{
  readonly?: true
}>()

const selectedItem = ref<Skill>()
const needChildren = ref(true)

const handleDisableBtn = (item: Skill | undefined | null, parentId: string) => {
  if (!item) {
    return true
  }
  if (item.id === parentId) {
    return true
  }
  return false
}

const availableSkills = ref<Skill[]>([
  { id: 'doctorDance', name: 'doctor dance' },
  { id: 'skibi', name: 'skibidi' }
])

const items = defineModel<Skill[]>()

const addChild = (
  parentId: string,
  newChild: Skill,
  skills: Skill[],
  needChildren: boolean
): boolean => {
  for (const skill of skills) {
    if (skill.id === parentId) {
      if (!skill.children) {
        skill.children = []
      }
      if (needChildren) {
        newChild.children = []
      } else {
        newChild.children = undefined
      }
      const isDuplicate = skill.children.some((child) => child.id === newChild.id)
      if (isDuplicate) {
        alert(`Child with id "${newChild.id}" already exists under parent "${parentId}".`)
        return false
      }
      skill.children.push({ ...newChild })
      selectedItem.value = undefined
      return true
    }
    if (skill.children) {
      const added = addChild(parentId, newChild, skill.children, needChildren)
      if (added) {
        return true
      }
    }
  }
  return false
}

const delChild = (id: string, skills: Skill[]): boolean => {
  for (let i = 0; i < skills.length; i++) {
    if (skills[i].id === id) {
      skills.splice(i, 1) // Remove the item if found
      return true
    }
    if (skills[i].children) {
      const found = delChild(id, skills[i].children!)
      if (found) {
        // If found in children, return true to stop further searching
        return true
      }
    }
  }
  return false
}
const replaceChild = (newSkill: Skill, skills: Skill[]): boolean => {
  for (let i = 0; i < skills.length; i++) {
    if (skills[i].id === newSkill.id) {
      skills[i] = newSkill
      return true
    }
    if (skills[i].children) {
      const found = replaceChild(newSkill, skills[i].children!)
      if (found) {
        return true
      }
    }
  }
  return false
}
</script>
