import get from '../utils/get'
import post from '../utils/post'
import delet from '../utils/delete'
import put from '../utils/put'
export default{
    // 获取校区
    getCampus(){
        return get({
            url: 'work1/survey/getOffice'
        })
    },
    // 获取被调查对象
    getRespond(){
        return get({
            url: 'work1/survey/imformant'
        })
    },
    // 获取问卷类型
    getQuType(){
        return get({
            url: 'work1/survey/querySurveyTypes'
        })
    },
    // 获取回答问卷列表
    getAnList(data){
        return get({
            url: 'work1/survey/querySurveyManage',
            params: data
        })
    },
    // 获取问卷调查列表
    getQuList(data){
        return get({
            url: 'work1/survey/querySurveys',
            params: data
        })
    },
    //撤销
    getChangeState(data){
        return get({
            url: 'work1/survey/modifySurveyStatus',
            params: data
        })
    },
    // 发起问卷
    postCreQu(data){
        return post({
            url: 'work1/survey/registeSurvey',
            data: data
        })
    },
    // 问卷预览
    postQuView(data){
        return post({
            url: 'work1/survey/watch/'+data,
        })
    },
    // 数据统计
    getDataCount(surveyId){
        return get({
            url: 'work1/answerSur/dataCount/'+surveyId,
        })
    },
    // 我参与的问卷详情
    getAnsView(surveyId){
        return get({
            url: 'work1/answerSur/answerView/'+surveyId,
        })
    },
    // 我参与的问卷回答问题
    postAns(surveyId,data){
        return post({
            url: 'work1/answerSur/answer/'+surveyId,
            data: data
        })
    },
    // 我参与的问卷修改答案
    postEditAns(surveyId,data){
        return post({
            url: 'work1/answerSur/modifyAnswer/'+surveyId,
            data: data
        })
    }
}