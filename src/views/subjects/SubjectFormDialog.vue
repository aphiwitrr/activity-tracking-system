<script setup lang="ts">
import type { Subject } from '@/types/Subjects'
import { computed, onMounted, ref, watch } from 'vue'
import instance from '@/service/http'
import { useSubjectStore } from '@/stores/subject'
import type { VForm } from 'vuetify/components';
import type { PageParams } from '@/types/PageParams';
import { isArgumentsObject } from 'util/types';
const form = ref<VForm | null>(null)
const subjectStore = useSubjectStore()
const props = defineProps<{
    item: Subject | null
    isUpdate: boolean
    method: (subject: Subject) => Promise<void>
}>()
const emit = defineEmits(['close-dialog'])
const overlay = ref(false)
watch(overlay, (val) => {
    if (val) {
        setTimeout(() => {
            overlay.value = false
        }, 2000)
    }
})
const loading = ref(false)
const pageParams = ref<PageParams>({
    page: 1,
    limit: 10,
    sort: '',
    order: 'ASC',
    search: ''
})
const subject = ref(Object.assign({}, props.item))
const item = props.item?.id ?? '';
const items1 = ref<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
async function save() {
    const { valid } = await form.value!.validate()
    if (!valid) return
    subjectStore.editedSubject = subject.value
    // subjectStore.editedSubject.id = item
    // console.log(subjectStore.editedSubject)
    // console.log(item)
    // if (item != subject.value.id) {
    //     console.log(item)
    //     console.log(subject.value.id)
    //     await subjectStore.updateSubject()
    // } else {
    //     await subjectStore.saveSubject()
    // }
    await subjectStore.saveSubject()
    closeDialog()

}

const isFormValid = ref(false)

const rules = {
    required: (value: any) => !!value || ''
}

// Computed property to handle the image source dynamically


const reset = () => {
    subject.value = Object.assign({}, props.item)
}

const closeDialog = () => {
    emit('close-dialog')
    // fetchSubjects()
}
const fetchSubjects = async (search?: string) => {
    loading.value = true
    if (search) {
        pageParams.value.search = search
        console.log(pageParams.value.search)
    } else {
        pageParams.value.search = ''
    }
    console.log(pageParams.value.search)
    try {
        await subjectStore.fetchSubjectsPage(pageParams.value)
    } catch (error) {
        console.error('Error fetching subjects:', error)
    } finally {
        loading.value = false
    }
    // loading.value = true
    // try {
    //     await subjectStore.fetchSubjects(pageParams.value)
    // } catch (error) {
    //     console.error('Error fetching users:', error)
    // } finally {
    //     loading.value = false
    // }

}
onMounted(async () => {
    console.log(props.item)
    const item = props.item?.id;
    console.log(item)
    console.log(subject)
    // fetchSubjects()
})
</script>

<template>
    <v-card class="elevation-5" rounded="lg" style="padding: 20px" min-width="300px" max-width="1440px"
        max-height="800px">
        <v-row>
            <v-col class="d-flex justify-end" style="margin-bottom: -10px">
                <v-icon @click="closeDialog" size="x-large" icon="mdi-close-box-outline"></v-icon>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="4">
                <v-row>
                    <v-col style="margin-top: -30px" class="d-flex justify-center">
                        <p style="font-size: 24px; font-weight: bold">เพิ่ม/แก้ไขรายวิชา</p>
                    </v-col></v-row>
            </v-col>
            <v-col cols="12" md="8">
                <v-row class="my-1">
                    <p style="font-size: 20px; margin-left: 10px; font-weight: bold;">รายละเอียดรายวิชา</p>
                </v-row>
                <v-row>
                    <v-col>
                        <v-form ref="form" v-model="isFormValid">
                            <v-text-field v-model="subject.id" label="รหัสรายวิชา" variant="outlined" rounded="lg"
                                class="small-input" style="justify-content: center;"
                                :rules="[rules.required]"></v-text-field>
                            <v-text-field v-model="subject.thaiName" label="ชื่อรายวิชา" variant="outlined" rounded="lg"
                                class="small-input" :rules="[rules.required]"></v-text-field>
                            <v-text-field v-model="subject.engName" label="ชื่อรายวิชา (อังกฤษ)" variant="outlined"
                                rounded="lg" class="small-input" :rules="[rules.required]"></v-text-field>
                            <v-text-field v-model.number="subject.credit" label="หน่วยกิต" variant="outlined"
                                rounded="lg" class="small-input" :rules="[rules.required]"></v-text-field>
                            <v-text-field v-model="subject.studyTime" label="จำนวนชั่วโมงเรียน" variant="outlined"
                                rounded="lg" class="small-input" :rules="[rules.required]"></v-text-field>
                            <v-text-field v-model="subject.description" label="คำอธิบายรายวิชา" variant="outlined"
                                rounded="lg" class="" :rules="[rules.required]"></v-text-field>
                            <v-text-field v-model="subject.descriptionEng" label="คำอธิบายรายวิชา (อังกฤษ)"
                                variant="outlined" rounded="lg" class="" :rules="[rules.required]"></v-text-field>
                        </v-form>
                    </v-col>
                </v-row>
                <v-row>
                    <!-- <v-col>
                        <v-select v-model="subject.gender" :items="genders" item-title="name" label="เพศ"
                            variant="outlined" rounded="lg" class="small-input" :rules="[rules.required]"></v-select>
                    </v-col> -->
                    <v-col>
                        <!-- <v-combobox v-model="subject.roles" variant="outlined" multiple label="ตำแหน่ง" :items="roles"
                            item-title="name" item-value="id" :return-object="true" rounded="lg"
                            class="small-input"></v-combobox> -->
                    </v-col>
                </v-row>
                <v-row class="justify-end">
                    <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn><v-btn @click="save()"
                        variant="plain">บันทึก</v-btn>
                </v-row>
            </v-col>
        </v-row>

        <v-row>
            <!--add CLO-->
            <v-col cols="12" md="4">
                <v-row>
                    <v-col style="margin-top: -30px" class="d-flex justify-center">
                        <!-- <p style="font-size: 24px; font-weight: bold">เพิ่ม/แก้ไขรายวิชา</p> -->
                    </v-col></v-row>
            </v-col>
            <v-col cols="12" md="8">
                <v-row class="my-1">
                    <p style="font-size: 20px; margin-left: 10px; font-weight: bold;">CLO</p>
                </v-row>
                <v-row>
                    <v-col>
                        <v-form ref="form" v-model="isFormValid">
                            <v-row>
                                <v-combobox :items="items1" variant="outlined" rounded="lg"
                                    class="small-input"></v-combobox>
                            </v-row>
                            <v-row class="justify-center">
                                <v-btn icon="mdi-plus" class="ma-8 rounded-circle" size="40px"
                                    variant="outlined"></v-btn>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
                <v-row class="justify-end">
                    <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn><v-btn @click="save()"
                        variant="plain">บันทึก</v-btn></v-row>
            </v-col>
        </v-row>

        <v-row>
            <!--add skill-->
            <v-col cols="12" md="4">
                <v-row>
                    <v-col style="margin-top: -30px" class="d-flex justify-center">
                        <!-- <p style="font-size: 24px; font-weight: bold">เพิ่ม/แก้ไขรายวิชา</p> -->
                    </v-col></v-row>
            </v-col>
            <v-col cols="12" md="8">
                <v-row class="my-1">
                    <p style="font-size: 20px; margin-left: 10px; font-weight: bold;">Skill</p>
                </v-row>
                <v-row>
                    <v-col>
                        <v-form ref="form" v-model="isFormValid">
                            <v-row>
                                <v-combobox :items="items1" variant="outlined" rounded="lg"
                                    class="small-input"></v-combobox>
                            </v-row>
                            <v-row class="justify-center">
                                <v-btn icon="mdi-plus" class="ma-8 rounded-circle" size="40px"
                                    variant="outlined"></v-btn>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
                <v-row class="justify-end">
                    <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn><v-btn @click="save()"
                        variant="plain">บันทึก</v-btn></v-row>
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped>
.v-text-field {
    height: 55px;
    margin-bottom: 15px;
}

.details-text {
    margin-left: 10px;
    /* Adjust the spacing between the div and p as needed */
    font-weight: bold;
    font-size: 20px;
}
</style>
