<template>
  <PageWapper>
    <PageOptionsWapper>
      <Button type="primary" @click="save()">保存</Button>
    </PageOptionsWapper>
    <PageContainerWapper>
      <Form :model="FormData" :label-width="80">
        <FormItem label="旧密码">
          <Input v-model="FormData.oldPass" placeholder="旧密码"></Input>
        </FormItem>
        <FormItem label="新密码">
          <Input v-model="FormData.newPass" placeholder="新密码"></Input>
        </FormItem>
        <FormItem label="新密码">
          <Input v-model="tempPass" placeholder="重复新密码"></Input>
        </FormItem>
      </Form>
    </PageContainerWapper>
  </PageWapper>
</template>

<script>
    import {ChangePass} from '../../service/userDO.js';

    export default {
        name: "pass.vue",
        data() {
            return {
                tempPass:'',
                FormData: {
                    id: '',
                    oldPass: '',
                    newPass: '',
                },
            }
        },
        created() {
            this.loadData()
        },
        methods: {
            save(){
                if(this.FormData.newPass==this.tempPass){
                    ChangePass(this.FormData,(data)=>{
                        this.$Message.success(data);
                    },(error)=>{
                        this.$Message.error(error);
                    })
                }else{
                    this.$Message.error('两次密码不一致');
                }

            }
        },
    }
</script>

<style scoped>

</style>
