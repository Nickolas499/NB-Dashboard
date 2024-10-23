import os
import tkinter as tk
from tkinter import filedialog, messagebox

def read_file_content(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    except UnicodeDecodeError:
        try:
            with open(file_path, 'r', encoding='latin-1') as file:
                return file.read()
        except:
            return "[Contenido binario o codificación no soportada]"
    except Exception as e:
        return f"[Error al leer el archivo: {str(e)}]"

def is_text_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            file.read(1024)  # Intenta leer los primeros 1024 bytes
        return True
    except:
        return False

def generate_markdown(file_path):
    markdown_content = f"""
    estoy creando el siguente proyecto, que es un Editor de codigos como VScode, un poco mas sencillo. pero este consta de un chat bot conectado a un modelo LLM  el cual deberia  crear aplicaciones de forma autonoma  siguiendo las instrucciones del usuario.
    tengo muchas cosas por hacer y necesito que me ayudes con este proyecto.

    ### Aqui te presento parte de la interfas de mi proyecto.  
    # Estructura del fichero:\n\n"""
    
    # Agregar la estructura de directorios
    for root, dirs, files in os.walk(file_path):
        level = root.replace(file_path, '').count(os.sep)
        indent = ' ' * 4 * (level)
        markdown_content += f"{indent}{os.path.basename(root)}/\n"
        sub_indent = ' ' * 4 * (level + 1)
        for file in files:
            markdown_content += f"{sub_indent}{file}\n"
    
    markdown_content += "\n"

    # Agregar el contenido de cada archivo
    for root, dirs, files in os.walk(file_path):
        for file in files:
            file_path = os.path.join(root, file)
            markdown_content += f"========================[ {file} ]========================\n"
            if is_text_file(file_path):
                markdown_content += f"```\n{read_file_content(file_path)}\n```\n"
            else:
                markdown_content += "[Archivo binario o no legible]\n\n"

    return markdown_content

def save_markdown(content):
    file_path = filedialog.asksaveasfilename(defaultextension=".md", filetypes=[("Markdown files", "*.md")])
    if file_path:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        messagebox.showinfo("Éxito", f"Archivo Markdown guardado en: {file_path}")
    else:
        messagebox.showwarning("Advertencia", "No se guardó el archivo Markdown.")

class Application(tk.Frame):
    def __init__(self, master=None):
        super().__init__(master)
        self.master = master
        self.master.title("Conversor de Directorio a Markdown")
        self.master.geometry("400x150")
        self.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        self.create_widgets()
        self.directory = None

    def create_widgets(self):
        self.select_button = tk.Button(self)
        self.select_button["text"] = "Seleccionar Directorio"
        self.select_button["command"] = self.select_directory
        self.select_button.pack(fill=tk.X, pady=10)

        self.convert_button = tk.Button(self)
        self.convert_button["text"] = "Convertir a Markdown"
        self.convert_button["command"] = self.convert_to_markdown
        self.convert_button.pack(fill=tk.X, pady=10)

        self.quit_button = tk.Button(self, text="Salir", fg="red",
                                     command=self.master.destroy)
        self.quit_button.pack(fill=tk.X, pady=10)

    def select_directory(self):
        self.directory = filedialog.askdirectory()
        if self.directory:
            messagebox.showinfo("Directorio seleccionado", f"Se ha seleccionado: {self.directory}")
        else:
            messagebox.showwarning("Advertencia", "No se seleccionó ningún directorio.")

    def convert_to_markdown(self):
        if self.directory:
            markdown_content = generate_markdown(self.directory)
            save_markdown(markdown_content)
        else:
            messagebox.showerror("Error", "Por favor, seleccione un directorio primero.")

def main():
    root = tk.Tk()
    app = Application(master=root)
    app.mainloop()

if __name__ == "__main__":
    main()