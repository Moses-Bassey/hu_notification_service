import {
    Table,
    BelongsTo,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
} from 'sequelize-typescript';
import { Auditable } from 'src/models/auditable.model';
import { Notification } from 'src/models/notification.model';

@Table({
    tableName: 'notification_audiences',
})
export class NotificationAudience extends Auditable {
    @PrimaryKey
    @AutoIncrement
    @Column({
        allowNull: false,
    })
    id: number;

    @Column({
        allowNull: false,
        defaultValue: DataType.UUIDV4,
    })
    uuid: string;

    @Column({
        allowNull: true,
    })
    user_id: number;

    @BelongsTo(() => Notification, 'notification_id')
    notification?: Notification;

    @Column({
        allowNull: false,
    })
    notification_id: number;
}
