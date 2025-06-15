const { pool } = require('../config/database');

class UserService {
  
  // Buscar usuário por Firebase UID
  static async findByFirebaseUid(firebaseUid) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE firebase_uid = ?',
        [firebaseUid]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  // Criar novo usuário
  static async create(userData) {
    try {
      const { firebaseUid, email, name } = userData;
      
      const [result] = await pool.execute(
        'INSERT INTO users (firebase_uid, email, name) VALUES (?, ?, ?)',
        [firebaseUid, email, name]
      );

      return {
        id: result.insertId,
        firebase_uid: firebaseUid,
        email,
        name
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Usuário já existe');
      }
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  // Buscar ou criar usuário
  static async findOrCreate(userData) {
    try {
      let user = await this.findByFirebaseUid(userData.firebaseUid);
      
      if (!user) {
        user = await this.create(userData);
      }
      
      return user;
    } catch (error) {
      throw new Error(`Erro ao buscar/criar usuário: ${error.message}`);
    }
  }

  // Atualizar dados do usuário
  static async update(firebaseUid, updateData) {
    try {
      const { name, email } = updateData;
      
      await pool.execute(
        'UPDATE users SET name = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE firebase_uid = ?',
        [name, email, firebaseUid]
      );

      return await this.findByFirebaseUid(firebaseUid);
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  // Deletar usuário
  static async delete(firebaseUid) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM users WHERE firebase_uid = ?',
        [firebaseUid]
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }
}

module.exports = UserService;