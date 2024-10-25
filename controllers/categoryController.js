import Category from '../models/category.js';

export function createCategory(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: 'You must be logged in',
        });
        return;
    }

    if (req.user.type !== 'Admin') {
        res.status(403).json({
            message: 'Only admins can create categories',
        });
        return;
    }

    const newCategory = new Category(req.body);

    newCategory
        .save()
        .then((result) => {
            res.json({
                message: 'Category created successfully',
                result: result,
            });
        })
        .catch((err) => {
            res.status(400).json({
                message: 'Category creation failed',
                error: err,
            });
        });
}


// deleteCategory

export function deleteCategory(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: 'You must be logged in',
        });
        return;
    }

    if (req.user.type !== 'Admin') {
        res.status(403).json({
            message: 'Only admins can delete categories',
        });
        return;
    }
    const name = req.params.name
    Category.findOneAndDelete({ name: name }).then(
        () => {
            res.json(
                {
                    message: 'Category deleted successfully'
                }
            );
        }
    )
}

export function getCategory(req, res) {
    Category.find().then(
        (result) => {
            res.json(
                {
                    Categories: result
                }
            )
        }
    ).catch(
        () => {
            {
                message: "failed to get catefories"
            }
        }
    )
}

export function getCategorybyname(req, res) {
    const name = req.params.name
    Category.findOne({ name: name }).then(
        (result) => {
            if (result == null) {
                res.json(
                    {
                        message: "Category not found"
                    }
                )
            } else {
                res.json(
                    {
                        category: result
                    }
                )
            }
        }
    ).catch(
        () => {
            res.json(
                {
                    message: "failed to get cateforie"
                }
            )
        }
    )
}

export function updateCategory(req, res) {
    if (!isAdminValid(req)) {
        res.status(403).json({
            message: "Unauthorized"
        });
        return;
    }

    const name = req.params.name;

    Category.updateOne({ name: name }, req.body)
        .then(() => {
            res.json({
                message: "Category updated successfully"
            });
        })
        .catch(() => {
            res.status(404).json({
                message: "Category not found"
            });
        });
}


function isAdminValid(req) {
    if (req.user == null) {
        return false;
    }
    if (req.user.type != 'Admin') {
        return false;
    }
    return true;
}