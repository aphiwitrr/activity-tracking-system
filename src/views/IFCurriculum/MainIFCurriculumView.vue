<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import http from '@/service/http'
import { useCurriculumStore } from '@/stores/curriculums'
import type { Curriculum } from '@/types/Curriculums'
import curriculumService from '@/service/curriculums'
import type { VForm } from 'vuetify/components'
const curriculumStore = useCurriculumStore()
const curriculums = computed(() => curriculumStore.curriculums)
const select = ref<string | null>(null)
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
onMounted(() => {
  curriculumStore.fetchCurriculums()
})
const filteredCurriculums = computed(() => {
  if (select.value) {
    return curriculums.value.filter((curriculum) => curriculum.thaiName === select.value)
  } else {
    return curriculums.value
  }
})
</script>
<template>
  <div class="bg-grey-lighten-4" style="height: 1000px">
    <v-breadcrumbs :items="['หน้าหลัก', 'หลักสูตร', 'วิทยาการสารสนเทศ']">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <p style="font-size: xx-large; margin-left: 3%">วิทยาการสารสนเทศ</p>

    <v-card class="ma-5">
      <v-card-actions>
        <p class="font-weight-black ma-2" style="font-size: small">เล่มหลักสูตร</p>
        <v-select
          v-model="select"
          :items="curriculums.map((curriculum) => curriculum.thaiName)"
          variant="outlined"
          rounded="lg"
        ></v-select>
      </v-card-actions>
    </v-card>

    <v-card class="ma-5">
      <p class="font-weight-black ma-5" style="font-size: large">
        <v-icon left size="xx-small" class="mr-2" color="#112f69">mdi-circle</v-icon>เนื้อหาหลักสูตร
      </p>
      <v-card-actions>
        <p class="font-weight-black ma-2" style="font-size: small">รายละเอียด</p>
        <v-spacer></v-spacer>
        <v-btn
          :icon="show1 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show1 = !show1"
        ></v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show1">
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <v-list-item v-for="curriculum in filteredCurriculums" :key="curriculum.id">
                <v-list-item-content>
                  <v-list-item-title>{{ curriculum.thaiName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ curriculum.engName }}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{ curriculum.thaiDegreeName }}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{ curriculum.engDegreeName }}</v-list-item-subtitle>
                  <v-list-item-subtitle
                    >Duration: {{ curriculum.period }} years</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Minimum Grade: {{ curriculum.minimumGrade }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </div>
      </v-expand-transition>
      <v-card-actions>
        <p class="font-weight-black ma-2" style="font-size: small">อาจารย์ผู้รับผิดชอบหลักสูตร</p>
        <v-spacer></v-spacer>

        <v-btn
          :icon="show2 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show2 = !show2"
        ></v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show2">
          <v-divider></v-divider>

          <v-card-text>
            <v-list>
              <v-list-item v-for="curriculum in filteredCurriculums" :key="curriculum.id">
                <v-list-item-content>
                  <v-list-item-title>{{ curriculum.coordinators }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list></v-card-text
          >
        </div>
      </v-expand-transition>
      <v-card-actions>
        <p class="font-weight-black ma-2" style="font-size: small">
          ผลการเรียนรู้ที่คาดหวังของหลักสูตร
        </p>
        <v-spacer></v-spacer>
        <v-btn
          :icon="show3 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show3 = !show3"
        ></v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show3">
          <v-divider></v-divider>
          <v-card-text>
            <v-list v-if="filteredCurriculums.length && filteredCurriculums[0].plos">
              <v-list-item v-for="plo in filteredCurriculums[0].plos" :key="plo.id">
                <v-list-item-content>
                  <v-list-item-title>{{ plo.num_plo }}</v-list-item-title>
                  <v-list-item-subtitle class="plo-description">
                    รายละเอียด: {{ plo.description }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle
                    >ผลลัพธ์การเรียนรู้ ตามมาตรฐาน คุณวุฒิฯ:
                    {{ plo.resultTypes }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <br />
            </v-list>
            <v-alert v-else type="info">No learning outcomes available.</v-alert>
          </v-card-text>
        </div>
      </v-expand-transition>
      <v-card-actions>
        <p class="font-weight-black ma-2" style="font-size: small">การจัดกระบวนการเรียนรู้</p>
        <v-spacer></v-spacer>

        <v-btn
          :icon="show4 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show4 = !show4"
        ></v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show4">
          <v-divider></v-divider>

          <v-card-text> 4 </v-card-text>
        </div>
      </v-expand-transition>
      <v-card-actions>
        <p class="font-weight-black ma-2" style="font-size: small">
          โครงสร้างหลักสูตร รายวิชาและหน่วยกิต
        </p>
        <v-spacer></v-spacer>

        <v-btn
          :icon="show5 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show5 = !show5"
        ></v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show5">
          <v-divider></v-divider>

          <v-card-text> 5 </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <!-- <div class="container">
      <v-card max-width="40%" style="padding: 5px">
        <v-btn-toggle rounded="8" group>
          <v-btn value="left" style="margin-right: 2%"> หลักสูตรปริญญาตรี </v-btn>

          <v-btn value="center"> หลักสูตรปริญญาโท </v-btn>

          <v-btn value="right"> หลักสูตรปริญญาเอก </v-btn>
        </v-btn-toggle>
      </v-card>
    </div> -->
    <!-- 
  <div class="container">
    <v-card max-width="40%">
      <v-tabs fixed-tabs justify="center">
        <v-tab value="one">หลักสูตรปริญญาตรี</v-tab>
        <v-tab value="two">หลักสูตรปริญญาโท</v-tab>
        <v-tab value="three">หลักสูตรปริญญาเอก</v-tab>
      </v-tabs>
    </v-card>
  </div>
  <br />
  <div class="container">
    <v-card max-width="100%">
      <v-tabs v-model="tab">
        <v-tab value="one">สาขาวิทยาการคอมพิวเตอร์ <br />Computer Science ( CS )</v-tab>
        <v-tab value="two"
          >สาขาเทคโนโลยีสารสนเทศเพื่ออุตสาหกรรมดิจิทัล <br />Information Technology for Digital
          Industry ( IT )</v-tab
        >
        <v-tab value="three">สาขาวิศวกรรมซอฟต์แวร์ <br />Software Engineering ( SE )</v-tab>
        <v-tab value="four"
          >สาขาปัญญาประดิษฐ์ประยุกต์และเทคโนโลยีอัจฉริยะ<br />
          Applied Artificial Intelligence and Smart Technology ( AAI )</v-tab
        >
      </v-tabs>
    </v-card>
  </div>
  <br />
  <div class="container">
    <v-card style="width: 86vw; height: 100vw">
      <v-card-title style="text-align: left; margin: 2%">รายละเอียด</v-card-title>
      <v-divider class="mx-4 mb-1" style="margin: 2%"></v-divider>
      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="one">
            <p style="font-size: large; margin-left: 3%">ชื่อปริญญา</p>
            <p style="margin-left: 6%; font-size: medium">
              ภาษาไทย: วิทยาศาสตรบัณฑิต (วิทยาการคอมพิวเตอร์) <br />ชื่อย่อภาษาไทย: วท.บ.
              (วิทยาการคอมพิวเตอร์) <br />ภาษาอังกฤษ: Bachelor of Science (Computer Science)
              <br />ชื่อย่อภาษาอังกฤษ: B.Sc. (Computer Science)
            </p>

            <p style="font-size: large; margin-left: 3%">คำอธิบายสาขาวิชา</p>
            <p style="margin-left: 6%; font-size: medium">
              วิทยาการคอมพิวเตอร์ (Computer Science: CS)
              เป็นศาสตร์เกี่ยวกับการศึกษาค้นคว้าทฤษฏีการคำนวณสำหรับคอมพิวเตอร์
              และทฤษฏีการประมวลผลสารสนเทศ ทั้งด้านซอฟต์แวร์ ฮาร์ดแวร์ และ เครือข่าย
              ประกอบด้วยหลายหัวข้อที่เกี่ยวข้อง เช่น การวิเคราะห์และสังเคราะห์ขั้นตอนวิธี
              ทฤษฎีภาษาโปรแกรม ทฤษฏีการพัฒนาซอฟต์แวร์ ทฤษฎีฮาร์ดแวร์คอมพิวเตอร์ และทฤษฏีเครือข่าย
            </p>

            <p style="font-size: large; margin-left: 3%">ผลการเรียนรู้ที่คาดหวังของหลักสูตร</p>
            <p style="margin-left: 6%; font-size: medium">
                <ol>
                    <li>บัณฑิตมีความรู้ความสามารถทางด้านวิทยาการคอมพิวเตอร์และศาสตร์ที่เกี่ยวข้อง</li>
                        <li>บัณฑิตมีความสามารถในการวิเคราะห์ปํญหาและเลือกวิธีการแก้ปัญหาได้อย่างเหมาะสม</li>
                            <li>บัณฑิตมีความพร้อมในการเรียนรู้สิ่งใหม่ สามารถค้นคว้าหาความรู้ ได้ด้วยตนเอง</li>
                                <li>บัณฑิตมีความสามารถในการทำงานร่วมกับผู้อื่นได้และยอมรับฟังความคิดเห็นของผู้อื่น</li>
                                    <li>บัณฑิตมีความสามารถในการสื่อสารและการนำเสนอข้อมูลทางวิทยาการคอมพิวเตอร์
              และศาสตร์ที่เกี่ยวข้องให้เข้าใจได้ทั้งภาษาไทยและภาษาอังกฤษ</li>
              <li>บัณฑิตมีจรรยาบรรณและจริยธรรมในวิชาชีพ มีความรับผิดชอบต่อตนเองและสังคม</li>
            </ol>
            </p>

            <p style="font-size: large; margin-left: 3%">เล่มหลักสูตร</p>
            <p style="margin-left: 6%; font-size: medium">
                <ul>
                    <li @click="show = !show">วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์ หลักสูตรปรับปรุง พ.ศ. 2565 (ดาวน์โหลด)
    </li>
                    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card>
            <v-card-title> รายวิชา      <v-text-field
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
      ></v-text-field></v-card-title>

        <v-card-text>
            <v-container >
    <v-row no-gutters style="margin: 2%;">
      <v-col><p style="font-size: large">

            88634065
            Software Development
การพัฒนาซอฟต์แวร์
3 (2-2-5)</p>
แนวคิดและหลักการออกแบบซอฟต์แวร์ การออกแบบและสถาปัตยกรรมซอฟต์แวร์
รูปแบบการออกแบบโครงสร้างประเภทการวิเคราะห์เชิงวัตถุและการออกแบบและการออกแบบนั้น
ขึ้นอยู่กับองค์ประกอบและคุณภาพของการออกแบบและ
ใช้อินเตอร์เฟสซ้ำสำหรับการประยุกต์
ในการออกแบบและใช้งานสภาพแวดล้อมและเครื่องมือในการออกแบบซอฟต์แวร์ วงจรชีวิตของซอฟต์แวร์ และ
รูปแบบการพัฒนา ต้องการการวิเคราะห์และการเตรียมแบบจำลอง การตรวจสอบ และ
ความสมเหตุสมผล วิวัฒนาการซอฟต์แวร์และการบำรุงรักษา การบริหารจัดการกลุ่มคนที่ทำงานร่วมกัน
การตั้งค่าตารางเวลา การวัดคุณภาพซอฟต์แวร์และการควบคุมคุณภาพ

      </v-col>
      <v-col>
        <v-card style="margin-left: 5%; background-color:#f0f8ff;" title="ทักษะที่ได้รับ">
            <p style="margin: 2%;">
ความรู้พื้นฐานเกี่ยวกับการออกแบบซอฟต์แวร์
รูปแบบการออกแบบซอฟต์แวร์และสถาปัตยกรรม
การออกแบบเชิงวัตถุ การออกแบบตามองค์ประกอบ
อินเทอร์เฟซการรีไซเคิลคุณภาพซอฟต์แวร์สำหรับ
การประยุกต์ใช้แนวคิดในการออกแบบและ
ใช้เครื่องมือและสภาพแวดล้อม
สำหรับการออกแบบซอฟต์แวร์ วงจรชีวิตของซอฟต์แวร์
จำเป็นต้องวิเคราะห์รูปแบบการพัฒนา
การสร้างรูปแบบ การทดสอบ และการตรวจสอบ
เพื่อความสมเหตุสมผล ซอฟต์แวร์
วิวัฒนาการการจัดการการบำรุงรักษา
กลุ่มคนที่ทำงานร่วมกัน
การจัดตารางเวลาคุณภาพ
การวัดการควบคุมคุณภาพซอฟต์แวร์
</p>
        </v-card>
      </v-col>
      <v-divider style="margin-top: 2%;"></v-divider>
    </v-row>
    <v-row no-gutters style="margin: 2%;">
        <v-col><p style="font-size: large">

88634065
Software Development
การพัฒนาซอฟต์แวร์
3 (2-2-5)</p>
แนวคิดและหลักการออกแบบซอฟต์แวร์ การออกแบบและสถาปัตยกรรมซอฟต์แวร์
รูปแบบการออกแบบโครงสร้างประเภทการวิเคราะห์เชิงวัตถุและการออกแบบและการออกแบบนั้น
ขึ้นอยู่กับองค์ประกอบและคุณภาพของการออกแบบและ
ใช้อินเตอร์เฟสซ้ำสำหรับการประยุกต์
ในการออกแบบและใช้งานสภาพแวดล้อมและเครื่องมือในการออกแบบซอฟต์แวร์ วงจรชีวิตของซอฟต์แวร์ และ
รูปแบบการพัฒนา ต้องการการวิเคราะห์และการเตรียมแบบจำลอง การตรวจสอบ และ
ความสมเหตุสมผล วิวัฒนาการซอฟต์แวร์และการบำรุงรักษา การบริหารจัดการกลุ่มคนที่ทำงานร่วมกัน
การตั้งค่าตารางเวลา การวัดคุณภาพซอฟต์แวร์และการควบคุมคุณภาพ

      </v-col>
      <v-col>
        <v-card style="margin-left: 5%; background-color:#f0f8ff;" title="ทักษะที่ได้รับ">
            <p style="margin: 2%;">
ความรู้พื้นฐานเกี่ยวกับการออกแบบซอฟต์แวร์
รูปแบบการออกแบบซอฟต์แวร์และสถาปัตยกรรม
การออกแบบเชิงวัตถุ การออกแบบตามองค์ประกอบ
อินเทอร์เฟซการรีไซเคิลคุณภาพซอฟต์แวร์สำหรับ
การประยุกต์ใช้แนวคิดในการออกแบบและ
ใช้เครื่องมือและสภาพแวดล้อม
สำหรับการออกแบบซอฟต์แวร์ วงจรชีวิตของซอฟต์แวร์
จำเป็นต้องวิเคราะห์รูปแบบการพัฒนา
การสร้างรูปแบบ การทดสอบ และการตรวจสอบ
เพื่อความสมเหตุสมผล ซอฟต์แวร์
วิวัฒนาการการจัดการการบำรุงรักษา
กลุ่มคนที่ทำงานร่วมกัน
การจัดตารางเวลาคุณภาพ
การวัดการควบคุมคุณภาพซอฟต์แวร์
</p>
        </v-card>
      </v-col>
      <v-divider  style="margin-top: 2%;"></v-divider>
    </v-row>
  </v-container>

        </v-card-text>
    </v-card>
      </div>
    </v-expand-transition>
                        <li>หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์ หลักสูตรปรับปรุง พ.ศ. 2564 (ดาวน์โหลด)</li>
                            <li>หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์ หลักสูตรปรับปรุง พ.ศ. 2559 (ดาวน์โหลด)</li>
                             
            </ul>
        </p>
          </v-tabs-window-item>

          <v-tabs-window-item value="two"> Two </v-tabs-window-item>

          <v-tabs-window-item value="three"> Three </v-tabs-window-item>

          <v-tabs-window-item value="four"> Four </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card> -->
    <!-- </div> -->
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.plo-description {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: inline-block;
  width: 200%;
}
</style>
