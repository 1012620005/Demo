/**
 * Created by daibi on 17/4/15.
 */

//学生首页
import {STUDENT} from './student'
// 任课老师
import {INSTRUCTOR} from './instructor'
// 辅导员
import {COUNSELLOR} from './counsellor'

//教师办公
import {CAMPUSOFFICE} from './campusOffice'
//机构管理
import {INSTITUTION} from './institution'
// 学生就业
import {EMPLOY} from './employ'
// 登录
import {LOGIN} from './login'
// 教务处
import {ACADEMICOFFICE} from './deanoffice'
// 迎新
import {ORIENTATION} from './orientation'
// 校务处
import {SCHMANAGE} from './schmanage'
// 财务管理
import {FINA} from './fina'
// 平台管理
import {PLATFORM} from './platform'
// 平台管理
import {COURSE} from './course'
// 平台管理
import {ADMIN} from './admin'
//学科管理
import {SUBJECT} from './subject'

// 投票管理
import {VOTE} from './vote'
// 用车管理
import {TRAMSPORT} from './tramsport'

// 学期管理
import {SEMESTER} from './semester'
// 离校管理
import{SCHOOLMANAGE} from './schoolManage'

// 成绩查询
import {SCORE} from './score'
// 培养管理
import {TRANING} from './traning'
// 通讯录管理
import {BOOK} from './book'
// 档案管理
import {FILE} from './file'
// 课程管理
import {COURSEMANAGE} from './courseManage'
import {MAJOR} from './major'
import {DICMANAGE} from './dicmanage'
//通用
// import {COMMONS} from './common'
export const ROUTES = [
    ...LOGIN,
    ...STUDENT,
    ...INSTRUCTOR,
    ...ACADEMICOFFICE,
    ...ORIENTATION,
    ...FINA,
    ...SCHMANAGE,
    ...INSTITUTION,
    ...COUNSELLOR,
    ...CAMPUSOFFICE, 
    ...EMPLOY,
    ...PLATFORM,
    ...COURSE,
    ...PLATFORM,
    ...PLATFORM,
    ...VOTE,
    ...SUBJECT,
    ...ADMIN,
    ...TRAMSPORT,
    ...SEMESTER,
    ...SCHOOLMANAGE,
    ...SCORE,
    ...TRANING,
    ...BOOK,
    ...FILE,
    ...COURSEMANAGE,
    ...MAJOR,
    ...DICMANAGE

]
