export class MenuRepository {
   constructor(prisma) {
     this.prisma = prisma;
   }
 
   async create(data) {
     return await this.prisma.menu.create({ data });
   }

   async findById(id) {
     return await this.prisma.menu.findUnique({ where: { id } });
   }

   async update(id, data) {
     return await this.prisma.menu.update({ where: { id: parseInt(id) }, data });
   }

   async delete(id) {
     return await this.prisma.menu.delete({ where: { id: parseInt(id) } });
   }

   async findAll() {
     return await this.prisma.menu.findMany();
   }
}
