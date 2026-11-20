export const MODULES = [
  { id: "thought", name: "思想先锋", short: "思想", motto: "铸魂固本", color: "#c83a3a" },
  { id: "growth", name: "梯队先锋", short: "梯队", motto: "成长领航", color: "#df6d2f" },
  { id: "integrity", name: "清廉先锋", short: "清廉", motto: "清风正气", color: "#2f8b72" },
  { id: "fortress", name: "堡垒先锋", short: "堡垒", motto: "支部联建", color: "#4475b8" },
  { id: "voice", name: "发声先锋", short: "发声", motto: "传播新声", color: "#7b5bb8" },
  { id: "example", name: "示范先锋", short: "示范", motto: "榜样带动", color: "#b24c78" },
  { id: "service", name: "实干先锋", short: "实干", motto: "服务践行", color: "#3d7f91" },
] as const;

export type ModuleId = (typeof MODULES)[number]["id"];
export type TaskLevel = "做好自己" | "带动他人" | "党建带团建";

export type Task = {
  id: string;
  module: ModuleId;
  title: string;
  level: TaskLevel;
  rule: string;
  points: number;
  maxPoints: number | null;
};

export const TASKS: Task[] = [
  { id: "t01", module: "thought", title: "组织生活全勤", level: "做好自己", rule: "按要求参加三会一课、主题党日，全勤得6分；无故缺勤1次扣2分。", points: 6, maxPoints: 6 },
  { id: "t02", module: "thought", title: "支部活动先锋贡献", level: "党建带团建", rule: "担任活动负责人、策划主题教育或作主题学习汇报，每次1分。", points: 1, maxPoints: 4 },
  { id: "t03", module: "thought", title: "思想汇报获认可", level: "做好自己", rule: "每季度按时提交思想汇报，获介绍人高度认可并审批。", points: 1, maxPoints: 1 },
  { id: "t04", module: "thought", title: "学习强国线上学习", level: "做好自己", rule: "月均400分得2分，600分加1分，院级学习达人再加1分。", points: 2, maxPoints: 4 },
  { id: "t05", module: "thought", title: "开展学习分享", level: "带动他人", rule: "围绕党的理论或一本好书完成一次学习分享。", points: 8, maxPoints: 8 },

  { id: "t06", module: "growth", title: "学期学习成绩", level: "做好自己", rule: "班级前50%得3分，前10%得7分，前5%得10分。", points: 3, maxPoints: 10 },
  { id: "t07", module: "growth", title: "学期履职汇报", level: "做好自己", rule: "按时提交思想、学业和先锋作用汇报得5分，优秀再加3分。", points: 5, maxPoints: 8 },
  { id: "t08", module: "growth", title: "学生干部履责", level: "带动他人", rule: "干部考核合格得5分，身兼多职加2分，获优秀干部再加3分。", points: 5, maxPoints: 10 },
  { id: "t09", module: "growth", title: "科创竞赛带动", level: "党建带团建", rule: "参加科创竞赛并带动班级同学参与，形成朋辈讲座或经验分享。", points: 3, maxPoints: 10 },

  { id: "t10", module: "integrity", title: "廉洁微课与诚信宣讲", level: "带动他人", rule: "在班级讲授廉洁微课或开展诚信考试宣讲，每次5分。", points: 5, maxPoints: 10 },
  { id: "t11", module: "integrity", title: "廉洁教育联建", level: "党建带团建", rule: "联合党团支部开展廉洁教育活动并形成完整记录。", points: 5, maxPoints: 10 },

  { id: "t12", module: "fortress", title: "指导团日活动", level: "带动他人", rule: "联系1个团支部并指导开展一次标准化主题团日活动。", points: 3, maxPoints: null },
  { id: "t13", module: "fortress", title: "争创活力团支部", level: "党建带团建", rule: "支委包干指导，推动联系团支部获评活力团支部。", points: 10, maxPoints: null },

  { id: "t14", module: "voice", title: "原创推文或短视频", level: "做好自己", rule: "每学期完成1篇推文或1条正能量短视频。", points: 3, maxPoints: null },
  { id: "t15", module: "voice", title: "带动班级投稿", level: "带动他人", rule: "带动班级投稿不少于3篇（条）。", points: 6, maxPoints: null },
  { id: "t16", module: "voice", title: "党团共办宣传项目", level: "党建带团建", rule: "组织宣传培训或参与建设党员先锋宣传专栏。", points: 6, maxPoints: null },

  { id: "t17", module: "example", title: "纪律意识", level: "做好自己", rule: "无通报批评、违纪处分得5分；轻微违纪扣5分。", points: 5, maxPoints: 5 },
  { id: "t18", module: "example", title: "日常全勤", level: "做好自己", rule: "课程、支部活动学期全勤得3分，连续两学期全勤再加1分。", points: 3, maxPoints: 4 },
  { id: "t19", module: "example", title: "文明示范寝室", level: "带动他人", rule: "四星及以上得3分，五星得5分，连续两学期五星再加2分。", points: 3, maxPoints: 7 },
  { id: "t20", module: "example", title: "操行成绩", level: "做好自己", rule: "操行评定良好得4分，优秀得7分。", points: 4, maxPoints: 7 },
  { id: "t21", module: "example", title: "校园文化示范带动", level: "党建带团建", rule: "带头参加校园文化活动并带动班级参与，形成特色团学品牌。", points: 3, maxPoints: 7 },

  { id: "t22", module: "service", title: "志愿服务时长", level: "做好自己", rule: "满20小时得10分，超过30小时加2分，超过50小时再加3分。", points: 10, maxPoints: 15 },
  { id: "t23", module: "service", title: "示范引领获奖", level: "带动他人", rule: "院级1分、校级2分、省级5分、国家级8分，每项计分。", points: 1, maxPoints: null },
  { id: "t24", module: "service", title: "先锋岗履职", level: "做好自己", rule: "完成每月先锋岗值班得1分，学期全勤再加1分。", points: 1, maxPoints: 2 },
  { id: "t25", module: "service", title: "星火传薪帮扶", level: "带动他人", rule: "完成1+N帮扶且记录完整得4分，帮扶效果良好再加3分。", points: 4, maxPoints: 7 },
  { id: "t26", module: "service", title: "寒暑假社会实践", level: "做好自己", rule: "实践不少于7天并提交报告得5分，获表彰或评奖再加3分。", points: 5, maxPoints: 8 },
  { id: "t27", module: "service", title: "特殊贡献", level: "党建带团建", rule: "校级以上媒体报道、见义勇为、无偿献血或重大志愿表彰，每次3分。", points: 3, maxPoints: null },
  { id: "t28", module: "service", title: "青年议事与诉求办理", level: "党建带团建", rule: "收集反馈不少于3条学生诉求并跟踪办理结果。", points: 3, maxPoints: null },
];

export const TASK_MAP = Object.fromEntries(TASKS.map((task) => [task.id, task]));

export const VETO_ITEMS = [
  "政治立场与思想言行出现重大偏差",
  "违法违纪或受到警告及以上处分",
  "考试作弊、代课代写等学术不端",
  "宿舍安全、校园欺凌等生活作风与道德失范",
  "入党材料弄虚作假、拉票贿选或入党动机明显不纯",
];
