import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  category:    { type: String, required: true, enum: ['写作', '设计', '视频', '办公', '翻译'] },
  difficulty:  { type: String, required: true, enum: ['入门', '进阶', '高阶'] },
  timeCost:    { type: String, required: true },
  income:      { type: String, required: true },
  problem:     { type: String, default: '' },
  solution:    { type: String, default: '' },
  result:      { type: String, default: '' },
  summary:     { type: String, required: true },
  steps:       [String],
  tools:       [String],
  tips:        { type: String, default: '' },
  image:       { type: String, default: '' },
  tags:        [String],
  isPublished: { type: Boolean, default: true },
  viewCount:   { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Case', caseSchema);
