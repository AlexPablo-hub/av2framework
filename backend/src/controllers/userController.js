const UserService = require('../services/userService');

class UserController {
  
  // Obter perfil do usuário atual
  static async getProfile(req, res) {
    try {
      const { uid: firebaseUid, email, name } = req.user;
      
      const user = await UserService.findOrCreate({
        firebaseUid,
        email,
        name
      });

      res.json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          firebase_uid: user.firebase_uid,
          created_at: user.created_at
        }
      });
    } catch (error) {
      console.error('Erro ao obter perfil:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Atualizar perfil do usuário
  static async updateProfile(req, res) {
    try {
      const { uid: firebaseUid } = req.user;
      const { name, email } = req.body;

      // Validação básica
      if (!name || !email) {
        return res.status(400).json({
          success: false,
          message: 'Nome e email são obrigatórios'
        });
      }

      const updatedUser = await UserService.update(firebaseUid, { name, email });

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Perfil atualizado com sucesso',
        data: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          firebase_uid: updatedUser.firebase_uid
        }
      });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Deletar conta do usuário
  static async deleteAccount(req, res) {
    try {
      const { uid: firebaseUid } = req.user;

      const deleted = await UserService.delete(firebaseUid);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Conta deletada com sucesso'
      });
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Dashboard - informações resumidas do usuário
  static async getDashboard(req, res) {
    try {
      const { uid: firebaseUid, email, name } = req.user;
      
      const user = await UserService.findOrCreate({
        firebaseUid,
        email,
        name
      });

      const TaskService = require('../services/taskService');
      const taskStats = await TaskService.getStatistics(user.id);

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          },
          statistics: {
            total_tasks: parseInt(taskStats.total) || 0,
            completed_tasks: parseInt(taskStats.completed) || 0,
            pending_tasks: parseInt(taskStats.pending) || 0,
            high_priority_tasks: parseInt(taskStats.high_priority) || 0
          }
        }
      });
    } catch (error) {
      console.error('Erro ao obter dashboard:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
}

module.exports = UserController;