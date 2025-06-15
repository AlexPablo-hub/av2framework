const { pool } = require('../config/database');

class TaskService {

  // Buscar todas as tarefas do usuário
  static async findAllByUser(userId) {
    try {
      const [rows] = await pool.execute(`
        SELECT id, title, description, completed, priority, due_date, 
               created_at, updated_at 
        FROM tasks 
        WHERE user_id = ? 
        ORDER BY created_at DESC
      `, [userId]);

      return rows;
    } catch (error) {
      throw new Error(`Erro ao buscar tarefas: ${error.message}`);
    }
  }

  // Buscar tarefa por ID
  static async findById(taskId, userId) {
    try {
      const [rows] = await pool.execute(`
        SELECT id, title, description, completed, priority, due_date, 
               created_at, updated_at 
        FROM tasks 
        WHERE id = ? AND user_id = ?
      `, [taskId, userId]);

      return rows[0] || null;
    } catch (error) {
      throw new Error(`Erro ao buscar tarefa: ${error.message}`);
    }
  }

  // Criar nova tarefa
  static async create(userId, taskData) {
    try {
      const { title, description, priority = 'medium', due_date } = taskData;

      const [result] = await pool.execute(`
        INSERT INTO tasks (user_id, title, description, priority, due_date) 
        VALUES (?, ?, ?, ?, ?)
      `, [userId, title, description, priority, due_date]);

      return await this.findById(result.insertId, userId);
    } catch (error) {
      throw new Error(`Erro ao criar tarefa: ${error.message}`);
    }
  }

  // Atualizar tarefa
  static async update(taskId, userId, updateData) {
    try {
      const { title, description, completed, priority, due_date } = updateData;

      await pool.execute(`
        UPDATE tasks 
        SET title = ?, description = ?, completed = ?, priority = ?, due_date = ?, 
            updated_at = CURRENT_TIMESTAMP 
        WHERE id = ? AND user_id = ?
      `, [title, description, completed, priority, due_date, taskId, userId]);

      return await this.findById(taskId, userId);
    } catch (error) {
      throw new Error(`Erro ao atualizar tarefa: ${error.message}`);
    }
  }

  // Marcar tarefa como concluída/não concluída
  static async toggleComplete(taskId, userId) {
    try {
      await pool.execute(`
        UPDATE tasks 
        SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ? AND user_id = ?
      `, [taskId, userId]);

      return await this.findById(taskId, userId);
    } catch (error) {
      throw new Error(`Erro ao alterar status da tarefa: ${error.message}`);
    }
  }

  // Deletar tarefa
  static async delete(taskId, userId) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM tasks WHERE id = ? AND user_id = ?',
        [taskId, userId]
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Erro ao deletar tarefa: ${error.message}`);
    }
  }

  // Estatísticas das tarefas do usuário
  static async getStatistics(userId) {
    try {
      const [rows] = await pool.execute(`
        SELECT 
          COUNT(*) AS total,
          SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) AS completed,
          SUM(CASE WHEN completed = 0 THEN 1 ELSE 0 END) AS pending,
          SUM(CASE WHEN priority = 'high' AND completed = 0 THEN 1 ELSE 0 END) AS \`high_priority\`
        FROM tasks
        WHERE user_id = ?
      `, [userId]);

      return rows[0];
    } catch (error) {
      throw new Error(`Erro ao buscar estatísticas: ${error.message}`);
    }
  }
}

module.exports = TaskService;