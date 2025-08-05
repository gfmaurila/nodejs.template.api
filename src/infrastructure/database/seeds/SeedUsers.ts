import { DataTypes } from 'sequelize';
import { sequelize } from '@/infrastructure/database/config/sequelize.instance';
import { Password } from '@/core/util/Password';
import { ENotificationType } from '@/domain/enums/ENotificationType';
import { EGender } from '@/domain/enums/EGender';


const UserModel = sequelize.define('TB_USER', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Senha: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  Notification: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Gender: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt',
  freezeTableName: true,
});

function generateSecurePassword(length = 12) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+[]{}|;:,.<>?';
  const all = lowercase + uppercase + numbers + special;

  let password = '';
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  for (let i = 4; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

async function seed() {
  await sequelize.sync();

  const rawPasswords = [];

  const users = [
    { Name: 'João Silva', Email: 'joao@example.com', Phone: '11999990001', Notification: ENotificationType.Email, Gender: EGender.Male, Senha: '' },
    { Name: 'Maria Oliveira', Email: 'maria@example.com', Phone: '11999990002', Notification: ENotificationType.SMS, Gender: EGender.Female, Senha: '' },
    { Name: 'Carlos Souza', Email: 'carlos@example.com', Phone: '11999990003', Notification: ENotificationType.WhatsApp, Gender: EGender.Male, Senha: '' },
    { Name: 'Ana Costa', Email: 'ana@example.com', Phone: '11999990004', Notification: ENotificationType.Email, Gender: EGender.Female, Senha: '' },
    { Name: 'Pedro Rocha', Email: 'pedro@example.com', Phone: '11999990005', Notification: ENotificationType.SMS, Gender: EGender.Male, Senha: '' },
    { Name: 'Guilherme F Maurila', Email: 'gfmaurila@gmail.com', Phone: '11999999999', Notification: ENotificationType.Email, Gender: EGender.Male, Senha: '' }
  ];

  for (const user of users) {
    const plainPassword = generateSecurePassword();
    rawPasswords.push({ Email: user.Email, Password: plainPassword });
    user.Senha = Password.ComputeSha256Hash(plainPassword);
  }

  const existing = await UserModel.findOne();
  if (!existing) {
    await UserModel.bulkCreate(users);
    console.log('Usuários de teste inseridos com sucesso\n');
    console.log('Senhas geradas:');
    rawPasswords.forEach(u => {
      console.log(`Email: ${u.Email} | Senha: ${u.Password}`);
    });
  } else {
    console.log('Usuários já existem. Seed ignorado');
  }

  await sequelize.close();
}

seed().catch((error) => {
  console.error('Erro ao executar o seed:', error);
  process.exit(1);
});
