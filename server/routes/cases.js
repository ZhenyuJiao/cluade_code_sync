import { Router } from 'express';
import Case from '../models/Case.js';
import auth from '../middleware/auth.js';

const router = Router();

// GET /api/cases — 公开，获取案例列表（支持筛选/排序/搜索）
router.get('/', async (req, res) => {
  try {
    const { category, q, sort } = req.query;
    const filter = { isPublished: true };
    if (category && category !== 'all') filter.category = category;

    let sortOption = { createdAt: -1 };
    if (sort === 'easiest') sortOption = { difficulty: 1 };
    else if (sort === 'highest-income') sortOption = { createdAt: -1 }; // 前端排序

    let query = Case.find(filter).sort(sortOption);
    if (q) {
      query = query.or([
        { title: { $regex: q, $options: 'i' } },
        { summary: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } },
      ]);
    }

    const cases = await query.lean();
    res.json({ cases });
  } catch (err) {
    res.status(500).json({ message: '获取案例失败' });
  }
});

// GET /api/cases/:id — 公开，获取单个案例
router.get('/:id', async (req, res) => {
  try {
    const c = await Case.findById(req.params.id);
    if (!c) return res.status(404).json({ message: '案例不存在' });
    await Case.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } });
    res.json({ case: c });
  } catch (err) {
    res.status(500).json({ message: '获取案例失败' });
  }
});

// POST /api/cases — 需认证，新增案例
router.post('/', auth, async (req, res) => {
  try {
    const c = await Case.create(req.body);
    res.status(201).json({ case: c });
  } catch (err) {
    res.status(400).json({ message: '创建案例失败', error: err.message });
  }
});

// PUT /api/cases/:id — 需认证，更新案例
router.put('/:id', auth, async (req, res) => {
  try {
    const c = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!c) return res.status(404).json({ message: '案例不存在' });
    res.json({ case: c });
  } catch (err) {
    res.status(400).json({ message: '更新案例失败', error: err.message });
  }
});

// DELETE /api/cases/:id — 需认证，删除案例
router.delete('/:id', auth, async (req, res) => {
  try {
    const c = await Case.findByIdAndDelete(req.params.id);
    if (!c) return res.status(404).json({ message: '案例不存在' });
    res.json({ message: '删除成功' });
  } catch (err) {
    res.status(500).json({ message: '删除失败' });
  }
});

export default router;
