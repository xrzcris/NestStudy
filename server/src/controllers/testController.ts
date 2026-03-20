/**
 * @openapi
 * /api/test:
 *   get:
 *     summary: Endpoint de prueba
 *     responses:
 *       200:
 *         description: Success
 */
export const getTest = (req: any, res: any) =>
{
    // DATOS HARDCODEADOS
    const data =
    [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Foo Bar" },
    ];

    res.json(data);
};

/**
 * @openapi
 * /api/test/{id}:
 *   get:
 *     summary: Get test por Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El Id
 *     responses:
 *       200:
 *         description: Success
 */
export const getTestById = (req: any, res: any) =>
{
    const { id } = req.params; // Get the id from the URL

    if (id === "1")
    {
        return res.json({ id: 1, name: "John Doe" });
    }
    else if (id === "2")
    {
        return res.json({ id: 2, name: "Foo Bar" });
    }

    return res.status(404).json({ message: "User not found" });
};

/**
 * @openapi
 * /api/test:
 *   post:
 *     summary: Prueba de POST (no hace nada)
 *     responses:
 *       201:
 *         description: Success
 */
export const createTest = (req: any, res: any) =>
{
    // Simulando la creación de una entrada
    return res.status(201).json({ message: "Success" });
};

/**
 * @openapi
 * /api/test/{id}:
 *   put:
 *     summary: Prueba de PUT (no hace nada)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: "Updated Name"
 *     responses:
 *       200:
 *         description: Test actualizado exitosamente
 *       404:
 *         description: No encontrado
 */
export const updateTestById = (req: any, res: any) =>
{
    const { id } = req.params;
    const { name } = req.body;

    if (id)
    {
        // Simulating an update
        return res.json({ id: id, name: name || "John Doe" });
    }

    return res.status(404).json({ message: "No encontrado" });
};

/**
 * @openapi
 * /api/test/{id}:
 *   delete:
 *     summary: Prueba de DELETE (no hace nada)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El Id
 *     responses:
 *       200:
 *         description: Eliminado
 *       404:
 *         description: No encontrado
 */
export const deleteTestById = (req: any, res: any) =>
{
    const { id } = req.params;

    if (id)
    {
        // Simulando la eliminación
        return res.json({ message: "Eliminado" });
    }

    return res.status(404).json({ message: "No encontrado" });
};