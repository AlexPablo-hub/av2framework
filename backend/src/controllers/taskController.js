const TaskService = require('../services/taskService');
const UserService = require('../services/userService');

class TaskController {
  
  // Listar todas as tarefas do usuário
  static async getTasks(req, res) {
    try {
      const { uid: firebaseUid } = req.user;
      
      const user = await UserService.findByFirebaseUid(firebaseUid);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      const tasks = await TaskService.findAllByUser(user.id);

      res.json({
        success: true,
        data: tasks
      });
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter uma tarefa específica
  static async getTask(req, res) {
    try {
      const { uid: firebaseUid } = req.user;
      const { id: taskId } = req.params;

      const user = await UserService.findByFirebaseUid(firebaseUid);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      const task = await TaskService.findById(taskId, user.id);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Tarefa não encontrada'
        });
      }

      res.json({
        success: true,
        data: task
      });
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Criar nova tarefa
  static async createTask(req, res) {
    try {
      const { uid: firebaseUid } = req.user;
      const { title, description, priority, due_date } = req.body;

      if (!title || title.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Título da tarefa é obrigatório'
        });
      }

      const validPriorities = ['low', 'medium', 'high'];
      if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({
          success: false,
          message: 'Prioridade deve ser: low, medium ou high'
        });
      }

      const user = await UserService.findByFirebaseUid(firebaseUid);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      const task = await TaskService.create(user.id, {
        title: title.trim(),
        description: description?.trim() || null,
        priority: priority || 'medium',
        due_date: due_date || null
      });

      res.status(201).json({
        success: true,
        message: 'Tarefa criada com sucesso',
        data: task
      });
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Atualizar tarefa
  static async updateTask(req, res) {
    try {
      const { uid: firebaseUid } = req.user;
      const { id: taskId } = req.params;
      const { title, description, completed, priority, due_date } = req.body;

      // Validação básica
      if (title !== undefined && (!title || title.trim().length === 0)) {
        return res.status(400).json({
          success: false,
          message: 'Título da tarefa não pode estar vazio'
        });
      }

      const user = await UserService.findByFirebaseUid(firebaseUid);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Verificar se a tarefa existe
      const existingTask = await TaskService.findById(taskId, user.id);
      if (!existingTask) {
        return res.status(404).json({
          success: false,
          message: 'Tarefa não encontrada'
        });
      }

      const updatedTask = await TaskService.update(taskId, user.id, {
        title: title?.trim() || existingTask.title,
        description: description?.trim() || existingTask.description,
        completed: completed !== undefined ? completed : existingTask.completed,
        priority: priority || existingTask.priority,
        due_date: due_date !== undefined ? due_date : existingTask.due_date
      });

      res.json({
        success: true,
        message: 'Tarefa atualizada com sucesso',
        data: updatedTask
      });
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Alternar status de conclusão da tarefa
  static async toggleTaskComplete(req, res) {
    try {
      const { uid: firebaseUid } = req.user;
      const { id: taskId } = req.params;

      const user = await UserService.findByFirebaseUid(firebaseUid);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      const updatedTask = await TaskService.toggleComplete(taskId, user.id);

      if (!updatedTask) {
        return res.status(404).json({
          success: false,
          message: 'Tarefa não encontrada'
        });
      }

      res.json({
        success: true,
        message: 'Status da tarefa alterado com sucesso',
        data: updatedTask
      });
    } catch (error) {
      console.error('Erro ao alterar status da tarefa:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Deletar tarefa
  static async deleteTask(req, res) {
    try {
      const { uid: firebaseUid } = req.user;
      const { id: taskId } = req.params;

      const user = await UserService.findByFirebaseUid(firebaseUid);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      const deleted = await TaskService.delete(taskId, user.id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Tarefa não encontrada'
        });
      }

      res.json({
        success: true,
        message: 'Tarefa deletada com sucesso'
      });
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter estatísticas das tarefas
  static async getStatistics(req, res) {
    try {
      const { uid: firebaseUid } = req.user;

      const user = await UserService.findByFirebaseUid(firebaseUid);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      const statistics = await TaskService.getStatistics(user.id);

      res.json({
        success: true,
        data: {
          total_tasks: parseInt(statistics.total) || 0,
          completed_tasks: parseInt(statistics.completed) || 0,
          pending_tasks: parseInt(statistics.pending) || 0,
          high_priority_tasks: parseInt(statistics.high_priority) || 0
        }
      });
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
}

module.exports = TaskController;